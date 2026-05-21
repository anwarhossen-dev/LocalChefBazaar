import React, { useState, useMemo } from 'react';

const useAccountingLogic = (initialAccounts, initialTransactions) => {
    const [accounts] = useState(initialAccounts);
    const [transactions, setTransactions] = useState(initialTransactions);

    const stats = useMemo(() => {
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        const netProfit = totalIncome - totalExpenses;
        const totalAssets = accounts
            .filter(a => a.type === 'assets')
            .reduce((sum, a) => sum + a.balance, 0);

        return {
            totalIncome,
            totalExpenses,
            netProfit,
            totalAssets
        };
    }, [accounts, transactions]);

    const addTransaction = (newTransaction) => {
        setTransactions(prev => [...prev, { ...newTransaction, id: Date.now() }]);
    };

    return {
        accounts,
        transactions,
        stats,
        addTransaction
    };
};

const AccountingOrchestrator = ({ initialAccounts, initialTransactions, children }) => {
    const logic = useAccountingLogic(initialAccounts, initialTransactions);
    return children(logic);
};

export default AccountingOrchestrator;
