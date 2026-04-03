const fs = require('fs');
const path = require('path');

function replaceInFile(filepath, replaces) {
    let content = fs.readFileSync(filepath, 'utf8');
    let original = content;
    for (const [search, replace] of replaces) {
        content = content.replace(search, replace);
    }
    if (content !== original) {
        fs.writeFileSync(filepath, content);
        console.log(`Fixed ${filepath}`);
    }
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (let f of files) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory() && f !== 'node_modules' && f !== '.git' && f !== 'dist') {
            processDir(full);
        } else if (f.endsWith('.js') || f.endsWith('.jsx')) {
            replaceInFile(full, [
                [/\/Hooks\//g, '/hooks/'],
                [/'\.\.\/Hooks\//g, "'../hooks/"],
                [/'\.\.\/\.\.\/Hooks\//g, "'../../hooks/"],
                [/'\.\.\/\.\.\/\.\.\/Hooks\//g, "'../../../hooks/"],
                [/"\.\.\/Hooks\//g, '"../hooks/'],
                [/"\.\.\/\.\.\/Hooks\//g, '"../../hooks/'],
                [/"\.\.\/\.\.\/\.\.\/Hooks\//g, '"../../../hooks/'],
                [/\/DashBoard\//g, '/Dashboard/'],
                [/\/Orderrequests"/g, '/OrderRequests"'],
                [/\/Orderrequests'/g, "/OrderRequests'"],
                [/\/comPONENTS\//gi, '/Components/']
            ]);
        }
    }
}

processDir(path.resolve('./src'));
