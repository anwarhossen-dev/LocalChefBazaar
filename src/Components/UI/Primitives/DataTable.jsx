import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const DataTable = ({ columns, data, renderRow, emptyMessage = "No data found" }) => {
    return (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto p-1">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            {columns.map((col, idx) => (
                                <th key={idx} className={`p-5 font-bold text-slate-500 uppercase text-xs tracking-wider ${col.className || ''}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {data.length > 0 ? (
                                data.map((item, index) => renderRow(item, index))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-16">
                                        <div className="text-6xl mb-4">📦</div>
                                        <h3 className="text-xl font-bold text-slate-700">{emptyMessage}</h3>
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
