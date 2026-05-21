import React, { useState } from 'react';
import { FaCalculator, FaChartLine, FaMoneyBillWave, FaFileInvoice, FaPlus } from 'react-icons/fa';
import { MdAccountBalance, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { toast } from 'react-toastify';
import StatCard from '../../../Components/UI/Primitives/StatCard';
import AccountingOrchestrator from '../../../Components/Dashboard/Accounting/AccountingOrchestrator';

const demoAccounts = [
    // Assets
    { id: 1, name: 'Cash', type: 'assets', balance: 25000, code: '1001' },
    { id: 2, name: 'Bank Account - Checking', type: 'assets', balance: 45000, code: '1002' },
    { id: 3, name: 'Accounts Receivable', type: 'assets', balance: 8500, code: '1100' },
    { id: 4, name: 'Inventory', type: 'assets', balance: 15000, code: '1200' },
    { id: 5, name: 'Equipment', type: 'assets', balance: 75000, code: '1500' },
    
    // Liabilities
    { id: 6, name: 'Accounts Payable', type: 'liabilities', balance: 12000, code: '2001' },
    { id: 7, name: 'Credit Card', type: 'liabilities', balance: 5500, code: '2100' },
    { id: 8, name: 'Loan Payable', type: 'liabilities', balance: 35000, code: '2200' },
    
    // Equity
    { id: 9, name: 'Owner Equity', type: 'equity', balance: 100000, code: '3001' },
    { id: 10, name: 'Retained Earnings', type: 'equity', balance: 16000, code: '3100' },
    
    // Income
    { id: 11, name: 'Food Sales', type: 'income', balance: 85000, code: '4001' },
    { id: 12, name: 'Beverage Sales', type: 'income', balance: 25000, code: '4002' },
    { id: 13, name: 'Delivery Fees', type: 'income', balance: 3500, code: '4100' },
    
    // Expenses
    { id: 14, name: 'Food Costs', type: 'expenses', balance: 35000, code: '5001' },
    { id: 15, name: 'Labor Costs', type: 'expenses', balance: 28000, code: '5100' },
    { id: 16, name: 'Rent Expense', type: 'expenses', balance: 12000, code: '5200' },
    { id: 17, name: 'Utilities', type: 'expenses', balance: 4500, code: '5300' },
    { id: 18, name: 'Marketing', type: 'expenses', balance: 2800, code: '5400' }
];

const demoTransactions = [
    { id: 1, date: '2024-04-01', type: 'income', account: 'Food Sales', amount: 1250.00, description: 'Daily sales revenue', category: 'sales' },
    { id: 2, date: '2024-04-01', type: 'expense', account: 'Food Costs', amount: 450.00, description: 'Fresh produce purchase', category: 'food-costs' },
    { id: 3, date: '2024-04-02', type: 'expense', account: 'Labor Costs', amount: 800.00, description: 'Staff wages - daily', category: 'labor' },
    { id: 4, date: '2024-04-02', type: 'income', account: 'Beverage Sales', amount: 380.00, description: 'Beverage sales revenue', category: 'sales' }
];

const AccountingSystem = () => {
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionData, setTransactionData] = useState({
        type: 'income', account: '', amount: 0, description: '', 
        date: new Date().toISOString().split('T')[0], category: 'sales'
    });

    const accountTypes = ['assets', 'liabilities', 'equity', 'income', 'expenses'];

    return (
        <AccountingOrchestrator initialAccounts={demoAccounts} initialTransactions={demoTransactions}>
            {({ accounts, transactions, stats, addTransaction }) => {
                
                const handleFormSubmit = (e) => {
                    e.preventDefault();
                    addTransaction(transactionData);
                    setShowTransactionModal(false);
                    toast.success('Transaction documented.');
                };

                return (
                    <div className="min-h-screen bg-gray-50/30 p-8 font-sans">
                        <div className="max-w-7xl mx-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-10">
                                <h1 className="text-4xl font-black text-slate-800 flex items-center gap-4">
                                    <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                                        <MdAccountBalance />
                                    </div>
                                    Accounting Ledger
                                </h1>
                                <button onClick={() => setShowTransactionModal(true)} className="btn btn-primary rounded-xl px-8 font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105">
                                    <FaPlus /> New Entry
                                </button>
                            </div>

                            {/* Financial Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                                <StatCard title="Total Assets" value={`$${stats.totalAssets.toLocaleString()}`} icon={MdTrendingUp} colorClass="border-emerald-100" />
                                <StatCard title="Total Income" value={`$${stats.totalIncome.toLocaleString()}`} icon={FaMoneyBillWave} colorClass="border-blue-100" />
                                <StatCard title="Total Expenses" value={`$${stats.totalExpenses.toLocaleString()}`} icon={MdTrendingDown} colorClass="border-rose-100" />
                                <StatCard title="Net Profit" value={`$${stats.netProfit.toLocaleString()}`} icon={FaChartLine} colorClass={stats.netProfit >= 0 ? "bg-emerald-500 text-white border-none" : "bg-rose-500 text-white border-none"} />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Chart of Accounts */}
                                <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                                    <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2">
                                        <FaFileInvoice className="text-primary text-xl" />
                                        Chart of Accounts
                                    </h2>
                                    
                                    <div className="space-y-8">
                                        {accountTypes.map(type => (
                                            <div key={type}>
                                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">{type}</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {accounts.filter(a => a.type === type).map(account => (
                                                        <div key={account.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100/50 hover:border-primary/30 transition-colors group">
                                                            <div className="font-bold text-slate-700 group-hover:text-primary transition-colors">{account.name}</div>
                                                            <div className="font-black text-slate-900">${account.balance.toLocaleString()}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 border border-slate-100 h-fit">
                                    <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2">
                                        <FaChartLine className="text-primary text-xl" />
                                        Recent Activity
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        {transactions.slice(-6).reverse().map(t => (
                                            <div key={t.id} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all duration-300">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-black text-slate-800">{t.description}</div>
                                                    <div className={`font-black ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                        {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                                                    <div className="uppercase tracking-tighter">{t.account}</div>
                                                    <div>{new Date(t.date).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal */}
                            {showTransactionModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowTransactionModal(false)}></div>
                                    <div className="bg-white rounded-[3rem] shadow-2xl relative w-full max-w-xl p-10 overflow-hidden">
                                        <h3 className="text-3xl font-black text-slate-800 mb-8">Record Transaction</h3>
                                        <form onSubmit={handleFormSubmit} className="space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <select className="select select-bordered rounded-2xl bg-slate-50 font-bold" value={transactionData.type} onChange={e => setTransactionData({...transactionData, type: e.target.value})}>
                                                    <option value="income">Income</option>
                                                    <option value="expense">Expense</option>
                                                </select>
                                                <input type="number" className="input input-bordered rounded-2xl bg-slate-50 font-black" placeholder="Amount" value={transactionData.amount} onChange={e => setTransactionData({...transactionData, amount: e.target.value})} />
                                            </div>
                                            <input type="text" className="input input-bordered w-full rounded-2xl bg-slate-50 font-bold" placeholder="Description" value={transactionData.description} onChange={e => setTransactionData({...transactionData, description: e.target.value})} />
                                            <div className="flex justify-end gap-3 mt-8">
                                                <button type="button" onClick={() => setShowTransactionModal(false)} className="btn btn-ghost rounded-2xl font-bold">Discard</button>
                                                <button type="submit" className="btn btn-primary rounded-2xl font-black px-10 shadow-lg shadow-primary/30">Commit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            }}
        </AccountingOrchestrator>
    );
};

export default AccountingSystem;