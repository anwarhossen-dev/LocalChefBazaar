const fs = require('fs');
const path = require('path');

function getActualCasePath(filepath) {
    if (!fs.existsSync(filepath)) return null;
    const parts = path.resolve(filepath).split(path.sep);
    let currentPath = parts[0];
    if (currentPath.length === 2 && currentPath[1] === ':') { currentPath += '\\'; } // Windows drive
    for (let i = 1; i < parts.length; i++) {
        if (!parts[i]) continue;
        const dir = fs.readdirSync(currentPath);
        const match = dir.find(d => d.toLowerCase() === parts[i].toLowerCase());
        if (!match) return null;
        if (match !== parts[i]) return match; // Found case mismatch!
        currentPath = path.join(currentPath, match);
    }
    return true; // Exact match
}

function checkDir(dir) {
    const files = fs.readdirSync(dir);
    for (let f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory() && f !== 'node_modules' && f !== '.git' && f !== 'dist') {
            checkDir(full);
        } else if (f.endsWith('.js') || f.endsWith('.jsx')) {
            const content = fs.readFileSync(full, 'utf8');
            const importRegex = /from\s+['"]([^'"]+)['"]/g;
            let m;
            while ((m = importRegex.exec(content)) !== null) {
                const importPath = m[1];
                if (importPath.startsWith('.')) {
                    let resolved = path.resolve(dir, importPath);
                    // Add .js or .jsx if no extension
                    if (!fs.existsSync(resolved) && fs.existsSync(resolved + '.js')) resolved += '.js';
                    else if (!fs.existsSync(resolved) && fs.existsSync(resolved + '.jsx')) resolved += '.jsx';
                    else if (!fs.existsSync(resolved) && fs.existsSync(path.join(resolved, 'index.js'))) resolved = path.join(resolved, 'index.js');
                    else if (!fs.existsSync(resolved) && fs.existsSync(path.join(resolved, 'index.jsx'))) resolved = path.join(resolved, 'index.jsx');
                    
                    const caseCheck = getActualCasePath(resolved);
                    if (typeof caseCheck === 'string') {
                        console.log(`MISMATCH in ${full}: imported '${importPath}', but actual filesystem has '${caseCheck}'`);
                    } else if (caseCheck === null) {
                       console.log(`MISSING in ${full}: imported '${importPath}'`);
                    }
                }
            }
        }
    }
}
checkDir(path.resolve('./src'));
