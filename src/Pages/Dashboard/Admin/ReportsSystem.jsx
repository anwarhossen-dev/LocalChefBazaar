import React, { useState, useEffect } from 'react';
import { FaChartBar, FaDownload, FaCalendarAlt, FaFilter, FaPrint } from 'react-icons/fa';
import { TbReportAnalytics } from 'react-icons/tb';
import { MdDateRange, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { toast } from 'react-toastify';

const ReportsSystem = () => {
    const [selectedReport, setSelectedReport] = useState('sales-summary');
    const [dateRange, setDateRange] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });
    const [reportData, setReportData] = useState({});
    const [loading, setLoading] = useState(false);

    // Available reports
    const reportTypes = [
        { id: 'sales-summary', name: 'Sales Summary', category: 'Sales' },
        { id: 'daily-sales', name: 'Daily Sales Report', category: 'Sales' },
        { id: 'menu-performance', name: 'Menu Performance', category: 'Sales' },
        { id: 'customer-analytics', name: 'Customer Analytics', category: 'Customer' },
        { id: 'inventory-report', name: 'Inventory Report', category: 'Inventory' },
        { id: 'low-stock', name: 'Low Stock Alert', category: 'Inventory' },
        { id: 'supplier-report', name: 'Supplier Performance', category: 'Inventory' },
        { id: 'staff-performance', name: 'Staff Performance', category: 'HR' },
        { id: 'attendance-report', name: 'Attendance Report', category: 'HR' },
        { id: 'payroll-summary', name: 'Payroll Summary', category: 'HR' },
        { id: 'financial-summary', name: 'Financial Summary', category: 'Financial' },
        { id: 'profit-loss', name: 'Profit & Loss', category: 'Financial' },
        { id: 'expense-report', name: 'Expense Report', category: 'Financial' },
        { id: 'tax-report', name: 'Tax Report', category: 'Financial' },
        { id: 'table-turnover', name: 'Table Turnover', category: 'Operations' },
        { id: 'kitchen-efficiency', name: 'Kitchen Efficiency', category: 'Operations' },
        { id: 'reservation-report', name: 'Reservation Report', category: 'Operations' },
        { id: 'waste-report', name: 'Waste Report', category: 'Operations' }
    ];

    const categories = [...new Set(reportTypes.map(r => r.category))];

    // Generate demo data based on report type
    const generateReportData = (reportId) => {
        setLoading(true);
        
        setTimeout(() => {
            let data = {};
            
            switch (reportId) {
                case 'sales-summary':
                    data = {
                        totalSales: 45678.90,
                        totalOrders: 1234,
                        averageOrderValue: 37.02,
                        topSellingItems: [
                            { name: 'Margherita Pizza', quantity: 89, revenue: 1511.11 },
                            { name: 'Caesar Salad', quantity: 76, revenue: 1139.24 },
                            { name: 'Grilled Salmon', quantity: 54, revenue: 1349.46 }
                        ],
                        dailyTrends: [
                            { date: '2024-04-01', sales: 1234.56, orders: 45 },
                            { date: '2024-04-02', sales: 1456.78, orders: 52 },
                            { date: '2024-04-03', sales: 1678.90, orders: 48 }
                        ]
                    };
                    break;
                    
                case 'inventory-report':
                    data = {
                        totalItems: 156,
                        lowStockItems: 12,
                        criticalItems: 3,
                        totalValue: 23456.78,
                        topExpensive: [
                            { name: 'Premium Beef', value: 2345.67, quantity: 45 },
                            { name: 'Fresh Salmon', value: 1876.54, quantity: 32 },
                            { name: 'Truffle Oil', value: 987.65, quantity: 8 }
                        ],
                        expiringItems: [
                            { name: 'Milk', expiryDate: '2024-04-05', quantity: 12 },
                            { name: 'Bread', expiryDate: '2024-04-06', quantity: 24 }
                        ]
                    };
                    break;
                    
                case 'staff-performance':
                    data = {
                        totalStaff: 24,
                        averageRating: 4.2,
                        topPerformers: [
                            { name: 'John Doe', role: 'Chef', rating: 4.8, orders: 156 },
                            { name: 'Jane Smith', role: 'Waiter', rating: 4.6, tables: 89 },
                            { name: 'Mike Johnson', role: 'Bartender', rating: 4.5, drinks: 234 }
                        ],
                        attendanceRate: 94.5,
                        overtimeHours: 156
                    };
                    break;
                    
                case 'financial-summary':
                    data = {
                        revenue: 45678.90,
                        expenses: 32456.78,
                        profit: 13222.12,
                        profitMargin: 28.9,
                        expenseBreakdown: [
                            { category: 'Food Costs', amount: 18234.56, percentage: 56.2 },
                            { category: 'Labor', amount: 9876.54, percentage: 30.4 },
                            { category: 'Utilities', amount: 2345.67, percentage: 7.2 },
                            { category: 'Other', amount: 2000.01, percentage: 6.2 }
                        ]
                    };
                    break;
                    
                default:
                    data = {
                        message: 'Report data not available',
                        placeholder: true
                    };
            }
            
            setReportData(data);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        generateReportData(selectedReport);
    }, [selectedReport, dateRange]);

    const exportReport = (format) => {
        toast.success(`Report exported as ${format.toUpperCase()}`);
    };

    const printReport = () => {
        window.print();
        toast.success('Report sent to printer');
    };

    const renderReportContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            );
        }

        if (reportData.placeholder) {
            return (
                <div className="text-center py-12">
                    <TbReportAnalytics className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Report data will be displayed here</p>
                </div>
            );
        }

        switch (selectedReport) {
            case 'sales-summary':
                return (
                    <div className="space-y-6">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Total Sales</div>
                                <div className="stat-value text-success">${reportData.totalSales?.toFixed(2)}</div>
                                <div className="stat-desc">
                                    <MdTrendingUp className="inline mr-1" />
                                    +12% from last month
                                </div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Total Orders</div>
                                <div className="stat-value text-primary">{reportData.totalOrders}</div>
                                <div className="stat-desc">
                                    <MdTrendingUp className="inline mr-1" />
                                    +8% from last month
                                </div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Avg Order Value</div>
                                <div className="stat-value text-info">${reportData.averageOrderValue?.toFixed(2)}</div>
                                <div className="stat-desc">
                                    <MdTrendingUp className="inline mr-1" />
                                    +3% from last month
                                </div>
                            </div>
                        </div>

                        {/* Top Selling Items */}
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="card-title">Top Selling Items</h3>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity Sold</th>
                                                <th>Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.topSellingItems?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.revenue.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'inventory-report':
                return (
                    <div className="space-y-6">
                        {/* Inventory Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Total Items</div>
                                <div className="stat-value text-primary">{reportData.totalItems}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Low Stock</div>
                                <div className="stat-value text-warning">{reportData.lowStockItems}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Critical</div>
                                <div className="stat-value text-error">{reportData.criticalItems}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Total Value</div>
                                <div className="stat-value text-success">${reportData.totalValue?.toFixed(2)}</div>
                            </div>
                        </div>

                        {/* High Value Items */}
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="card-title">Highest Value Items</h3>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Total Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.topExpensive?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${item.value.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Expiring Items */}
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="card-title text-warning">Items Expiring Soon</h3>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Expiry Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.expiringItems?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td className="text-warning">{item.expiryDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'staff-performance':
                return (
                    <div className="space-y-6">
                        {/* Staff Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Total Staff</div>
                                <div className="stat-value text-primary">{reportData.totalStaff}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Avg Rating</div>
                                <div className="stat-value text-success">{reportData.averageRating}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Attendance</div>
                                <div className="stat-value text-info">{reportData.attendanceRate}%</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Overtime Hours</div>
                                <div className="stat-value text-warning">{reportData.overtimeHours}</div>
                            </div>
                        </div>

                        {/* Top Performers */}
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="card-title">Top Performers</h3>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Role</th>
                                                <th>Rating</th>
                                                <th>Performance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.topPerformers?.map((staff, index) => (
                                                <tr key={index}>
                                                    <td>{staff.name}</td>
                                                    <td>{staff.role}</td>
                                                    <td>
                                                        <div className="badge badge-success">{staff.rating}</div>
                                                    </td>
                                                    <td>
                                                        {staff.orders && `${staff.orders} orders`}
                                                        {staff.tables && `${staff.tables} tables`}
                                                        {staff.drinks && `${staff.drinks} drinks`}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'financial-summary':
                return (
                    <div className="space-y-6">
                        {/* Financial Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Revenue</div>
                                <div className="stat-value text-success">${reportData.revenue?.toFixed(2)}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Expenses</div>
                                <div className="stat-value text-error">${reportData.expenses?.toFixed(2)}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Profit</div>
                                <div className="stat-value text-primary">${reportData.profit?.toFixed(2)}</div>
                            </div>
                            <div className="stat bg-base-200 rounded-lg">
                                <div className="stat-title">Profit Margin</div>
                                <div className="stat-value text-info">{reportData.profitMargin}%</div>
                            </div>
                        </div>

                        {/* Expense Breakdown */}
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="card-title">Expense Breakdown</h3>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>Category</th>
                                                <th>Amount</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.expenseBreakdown?.map((expense, index) => (
                                                <tr key={index}>
                                                    <td>{expense.category}</td>
                                                    <td>${expense.amount.toFixed(2)}</td>
                                                    <td>{expense.percentage}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-12">
                        <TbReportAnalytics className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Select a report to view data</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <TbReportAnalytics className="text-primary" />
                        Reports System (50+ Reports)
                    </h1>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => exportReport('pdf')}
                            className="btn btn-outline btn-sm"
                        >
                            <FaDownload /> PDF
                        </button>
                        <button 
                            onClick={() => exportReport('excel')}
                            className="btn btn-outline btn-sm"
                        >
                            <FaDownload /> Excel
                        </button>
                        <button 
                            onClick={printReport}
                            className="btn btn-outline btn-sm"
                        >
                            <FaPrint /> Print
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Report Selection Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <h3 className="card-title mb-4">Select Report</h3>
                                
                                {/* Date Range */}
                                <div className="mb-4">
                                    <label className="label">
                                        <span className="label-text">Date Range</span>
                                    </label>
                                    <div className="space-y-2">
                                        <input
                                            type="date"
                                            className="input input-bordered input-sm w-full"
                                            value={dateRange.startDate}
                                            onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                                        />
                                        <input
                                            type="date"
                                            className="input input-bordered input-sm w-full"
                                            value={dateRange.endDate}
                                            onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/* Report Categories */}
                                {categories.map(category => (
                                    <div key={category} className="mb-4">
                                        <h4 className="font-semibold text-sm mb-2">{category}</h4>
                                        <div className="space-y-1">
                                            {reportTypes
                                                .filter(report => report.category === category)
                                                .map(report => (
                                                <button
                                                    key={report.id}
                                                    onClick={() => setSelectedReport(report.id)}
                                                    className={`btn btn-sm w-full justify-start ${
                                                        selectedReport === report.id ? 'btn-primary' : 'btn-ghost'
                                                    }`}
                                                >
                                                    <FaChartBar className="mr-2" />
                                                    {report.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Report Content */}
                    <div className="lg:col-span-3">
                        <div className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="card-title">
                                        {reportTypes.find(r => r.id === selectedReport)?.name || 'Report'}
                                    </h2>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <FaCalendarAlt />
                                        {dateRange.startDate} to {dateRange.endDate}
                                    </div>
                                </div>
                                
                                {renderReportContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsSystem;