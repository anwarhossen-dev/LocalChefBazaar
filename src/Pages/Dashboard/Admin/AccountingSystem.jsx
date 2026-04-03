import React, { useState, useEffect } from 'react';
import { FaCalculator, FaChartLine, FaMoneyBillWave, FaFileInvoice, FaPlus } from 'react-icons/fa';
import { MdAccountBalance, MdTrendingUp, MdTrendingDown, MdPayment } from 'react-icons/md';
import { toast } from 'react-toastify';

const AccountingSystem = () => {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('current-month');
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionData, setTransactionData] = useState({
        type: 'income',
        account: '',
        amount: 0,
        description: '',
        date: new Date().toISOString().split('T')[0],
        category: 'sales'
    });

    const accountTypes = ['assets', 'liabilities', 'equity', 'income', 'expenses'];
    const transactionCategories = {
        income: ['sales', 'interest', 'other-income'],
        expense: ['food-costs', 'labor', 'utilities', 'rent', 'marketing', 'other-expenses']
    };

    // Demo chart of accounts
    useEffect(() => {
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
        setAccounts(demoAccounts);

        // Demo transactions
        const demoTransactions = [
            {
                id: 1,
                date: '2024-04-01',
                type: 'income',
                account: 'Food Sales',
                amount: 1250.00,
                description: 'Daily sales revenue',
                category: 'sales'
            },
            {
                id: 2,
                date: '2024-04-01',
                type: 'expense',
                account: 'Food Costs',
                amount: 450.00,
                description: 'Fresh produce purchase',
                category: 'food-costs'
            },
            {
                id: 3,
                date: '2024-04-02',
                type: 'expense',
                account: 'Labor Costs',
                amount: 800.00,
                description: 'Staff wages - daily',
                category: 'labor'
            },
            {
                id: 4,
                date: '2024-04-02',
                type: 'income',
                account: 'Beverage Sales',
                amount: 380.00,
                description: 'Beverage sales revenue',
                category: 'sales'
            }
        ];
        setTransactions(demoTransactions);
    }, []);

    const addTransaction = (e) => {
        e.preventDefault();
        
        const newTransaction = {
            id: Math.max(...transactions.map(t => t.id), 0) + 1,
            ...transactionData,
            amount: parseFloat(transactionData.amount)
        };
        
        setTransactions([...transactions, newTransaction]);
        
        // Update account balance
        const accountToUpdate = accounts.find(acc => acc.name === transactionData.account);
        if (accountToUpdate) {
            const balanceChange = transactionData.type === 'income' ? 
                parseFloat(transactionData.amount) : -parseFloat(transactionData.amount);
            
            setAccounts(accounts.map(acc => 
                acc.id === accountToUpdate.id 
                    ? { ...acc, balance: acc.balance + balanceChange }
                    : acc
            ));
        }
        
        setShowTransactionModal(false);
        setTransactionData({
            type: 'income',
            account: '',
            amount: 0,
            description: '',
            date: new Date().toISOString().split('T')[0],
            category: 'sales'
        });
        
        toast.success('Transaction added successfully');
    };

    const getAccountsByType = (type) => {
        return accounts.filter(account => account.type === type);
    };

    const getTotalByType = (type) => {
        return accounts
            .filter(account => account.type === type)
            .reduce((sum, account) => sum + account.balance, 0);
    };

    const getNetIncome = () => {
        const totalIncome = getTotalByType('income');
        const totalExpenses = getTotalByType('expenses');
        return totalIncome - totalExpenses;
    };

    const getRecentTransactions = () => {
        return transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10);
    };

    const totalAssets = getTotalByType('assets');
    const totalLiabilities = getTotalByType('liabilities');
    const totalEquity = getTotalByType('equity');
    const netIncome = getNetIncome();

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <MdAccountBalance className="text-primary" />
                        Accounting System
                    </h1>
                    <button 
                        onClick={() => setShowTransactionModal(true)}
                        className="btn btn-primary"
                    >
                        <FaPlus /> Add Transaction
                    </button>
                </div>

                {/* Financial Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-success">
                            <MdTrendingUp className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Assets</div>
                        <div className="stat-value text-success">${totalAssets.toLocaleString()}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-error">
                            <MdTrendingDown className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Liabilities</div>
                        <div className="stat-value text-error">${totalLiabilities.toLocaleString()}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-info">
                            <FaChartLine className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Equity</div>
                        <div className="stat-value text-info">${totalEquity.toLocaleString()}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-primary">
                            <FaMoneyBillWave className="text-3xl" />
                        </div>
                        <div className="stat-title">Net Income</div>
                        <div className={`stat-value ${netIncome >= 0 ? 'text-success' : 'text-error'}`}>
                            ${netIncome.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Chart of Accounts */}
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Chart of Accounts</h2>
                            
                            {accountTypes.map(type => (
                                <div key={type} className="mb-4">
                                    <h3 className="font-bold text-lg mb-2 capitalize">{type}</h3>
                                    <div className="space-y-1">
                                        {getAccountsByType(type).map(account => (
                                            <div key={account.id} className="flex justify-between items-center p-2 bg-base-100 rounded">
                                                <div>
                                                    <span className="font-medium">{account.name}</span>
                                                    <span className="text-sm text-gray-500 ml-2">({account.code})</span>
                                                </div>
                                                <span className={`font-semibold ${
                                                    type === 'assets' || type === 'income' ? 'text-success' : 
                                                    type === 'liabilities' || type === 'expenses' ? 'text-error' : 'text-info'
                                                }`}>
                                                    ${account.balance.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="divider"></div>
                                    <div className="flex justify-between font-bold">
                                        <span>Total {type.charAt(0).toUpperCase() + type.slice(1)}:</span>
                                        <span className={
                                            type === 'assets' || type === 'income' ? 'text-success' : 
                                            type === 'liabilities' || type === 'expenses' ? 'text-error' : 'text-info'
                                        }>
                                            ${getTotalByType(type).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Recent Transactions</h2>
                            
                            <div className="space-y-2">
                                {getRecentTransactions().map(transaction => (
                                    <div key={transaction.id} className="flex justify-between items-center p-3 bg-base-100 rounded">
                                        <div>
                                            <div className="font-medium">{transaction.description}</div>
                                            <div className="text-sm text-gray-500">
                                                {transaction.account} • {new Date(transaction.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-semibold ${
                                                transaction.type === 'income' ? 'text-success' : 'text-error'
                                            }`}>
                                                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                            </div>
                                            <div className={`badge badge-sm ${
                                                transaction.type === 'income' ? 'badge-success' : 'badge-error'
                                            }`}>
                                                {transaction.type}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Statements Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Balance Sheet Summary */}
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Balance Sheet</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-success">Assets</h3>
                                    <div className="text-2xl font-bold text-success">
                                        ${totalAssets.toLocaleString()}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="font-bold text-error">Liabilities</h3>
                                    <div className="text-2xl font-bold text-error">
                                        ${totalLiabilities.toLocaleString()}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="font-bold text-info">Equity</h3>
                                    <div className="text-2xl font-bold text-info">
                                        ${totalEquity.toLocaleString()}
                                    </div>
                                </div>
                                
                                <div className="divider"></div>
                                <div className="text-sm text-gray-500">
                                    Assets = Liabilities + Equity
                                </div>
                                <div className={`text-sm ${
                                    Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 0.01 ? 'text-success' : 'text-error'
                                }`}>
                                    Balance: {Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 0.01 ? '✓ Balanced' : '✗ Unbalanced'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Income Statement Summary */}
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Income Statement</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-success">Total Revenue</h3>
                                    <div className="text-2xl font-bold text-success">
                                        ${getTotalByType('income').toLocaleString()}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="font-bold text-error">Total Expenses</h3>
                                    <div className="text-2xl font-bold text-error">
                                        ${getTotalByType('expenses').toLocaleString()}
                                    </div>
                                </div>
                                
                                <div className="divider"></div>
                                
                                <div>
                                    <h3 className="font-bold">Net Income</h3>
                                    <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-success' : 'text-error'}`}>
                                        ${netIncome.toLocaleString()}
                                    </div>
                                </div>
                                
                                <div className="text-sm text-gray-500">
                                    Profit Margin: {getTotalByType('income') > 0 ? ((netIncome / getTotalByType('income')) * 100).toFixed(1) : 0}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cash Flow Summary */}
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Cash Flow</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold">Cash Position</h3>
                                    <div className="text-2xl font-bold text-primary">
                                        ${(accounts.find(a => a.name === 'Cash')?.balance || 0).toLocaleString()}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="font-bold">Bank Balance</h3>
                                    <div className="text-2xl font-bold text-info">
                                        ${(accounts.find(a => a.name === 'Bank Account - Checking')?.balance || 0).toLocaleString()}
                                    </div>
                                </div>
                                
                                <div className="divider"></div>
                                
                                <div>
                                    <h3 className="font-bold">Total Liquid Assets</h3>
                                    <div className="text-2xl font-bold text-success">
                                        ${((accounts.find(a => a.name === 'Cash')?.balance || 0) + 
                                           (accounts.find(a => a.name === 'Bank Account - Checking')?.balance || 0)).toLocaleString()}
                                    </div>
                                </div>
                                
                                <div className="text-sm text-gray-500">
                                    Available for operations
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Transaction Modal */}
                {showTransactionModal && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg mb-4">Add New Transaction</h3>
                            
                            <form onSubmit={addTransaction} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Transaction Type *</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={transactionData.type}
                                            onChange={(e) => setTransactionData({...transactionData, type: e.target.value})}
                                            required
                                        >
                                            <option value="income">Income</option>
                                            <option value="expense">Expense</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Account *</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={transactionData.account}
                                            onChange={(e) => setTransactionData({...transactionData, account: e.target.value})}
                                            required
                                        >
                                            <option value="">Select Account</option>
                                            {accounts
                                                .filter(acc => acc.type === transactionData.type || 
                                                              (transactionData.type === 'expense' && acc.type === 'expenses') ||
                                                              (transactionData.type === 'income' && acc.type === 'income'))
                                                .map(account => (
                                                <option key={account.id} value={account.name}>
                                                    {account.name} ({account.code})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Amount *</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="input input-bordered w-full"
                                            value={transactionData.amount}
                                            onChange={(e) => setTransactionData({...transactionData, amount: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Date *</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="input input-bordered w-full"
                                            value={transactionData.date}
                                            onChange={(e) => setTransactionData({...transactionData, date: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Description *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        value={transactionData.description}
                                        onChange={(e) => setTransactionData({...transactionData, description: e.target.value})}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={transactionData.category}
                                        onChange={(e) => setTransactionData({...transactionData, category: e.target.value})}
                                    >
                                        {transactionCategories[transactionData.type === 'income' ? 'income' : 'expense'].map(category => (
                                            <option key={category} value={category}>
                                                {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        Add Transaction
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setShowTransactionModal(false)}
                                        className="btn"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountingSystem;