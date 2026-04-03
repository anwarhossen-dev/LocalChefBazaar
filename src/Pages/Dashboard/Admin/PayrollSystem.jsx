import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave, FaCalculator, FaDownload, FaEye, FaUsers } from 'react-icons/fa';
import { MdPayment, MdSchedule, MdAccountBalance } from 'react-icons/md';
import { toast } from 'react-toastify';

const PayrollSystem = () => {
    const [employees, setEmployees] = useState([]);
    const [payrollPeriod, setPayrollPeriod] = useState({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });
    const [showPayslipModal, setShowPayslipModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [payrollStatus, setPayrollStatus] = useState('draft'); // draft, calculated, processed

    // Demo employees data
    useEffect(() => {
        const demoEmployees = [
            {
                id: 1,
                name: 'John Doe',
                employeeId: 'EMP001',
                position: 'Head Chef',
                department: 'Kitchen',
                baseSalary: 5000,
                hourlyRate: 25,
                hoursWorked: 160,
                overtimeHours: 12,
                bonuses: 500,
                deductions: {
                    tax: 750,
                    insurance: 200,
                    retirement: 300,
                    other: 50
                },
                bankAccount: '****1234',
                status: 'active'
            },
            {
                id: 2,
                name: 'Jane Smith',
                employeeId: 'EMP002',
                position: 'Restaurant Manager',
                department: 'Management',
                baseSalary: 6000,
                hourlyRate: 30,
                hoursWorked: 160,
                overtimeHours: 8,
                bonuses: 800,
                deductions: {
                    tax: 900,
                    insurance: 250,
                    retirement: 360,
                    other: 0
                },
                bankAccount: '****5678',
                status: 'active'
            },
            {
                id: 3,
                name: 'Mike Johnson',
                employeeId: 'EMP003',
                position: 'Waiter',
                department: 'Service',
                baseSalary: 2500,
                hourlyRate: 15,
                hoursWorked: 160,
                overtimeHours: 20,
                bonuses: 300,
                deductions: {
                    tax: 420,
                    insurance: 150,
                    retirement: 150,
                    other: 25
                },
                bankAccount: '****9012',
                status: 'active'
            },
            {
                id: 4,
                name: 'Sarah Wilson',
                employeeId: 'EMP004',
                position: 'Bartender',
                department: 'Bar',
                baseSalary: 3000,
                hourlyRate: 18,
                hoursWorked: 160,
                overtimeHours: 15,
                bonuses: 400,
                deductions: {
                    tax: 510,
                    insurance: 180,
                    retirement: 180,
                    other: 30
                },
                bankAccount: '****3456',
                status: 'active'
            }
        ];
        setEmployees(demoEmployees);
    }, []);

    const calculatePayroll = (employee) => {
        const regularPay = employee.baseSalary || (employee.hourlyRate * employee.hoursWorked);
        const overtimePay = employee.overtimeHours * (employee.hourlyRate * 1.5);
        const grossPay = regularPay + overtimePay + employee.bonuses;
        
        const totalDeductions = Object.values(employee.deductions).reduce((sum, deduction) => sum + deduction, 0);
        const netPay = grossPay - totalDeductions;

        return {
            regularPay,
            overtimePay,
            grossPay,
            totalDeductions,
            netPay
        };
    };

    const processPayroll = () => {
        if (payrollStatus === 'processed') {
            toast.error('Payroll already processed for this period');
            return;
        }

        setPayrollStatus('calculated');
        toast.success('Payroll calculated successfully');
        
        setTimeout(() => {
            setPayrollStatus('processed');
            toast.success('Payroll processed and payments initiated');
        }, 2000);
    };

    const generatePayslip = (employee) => {
        setSelectedEmployee(employee);
        setShowPayslipModal(true);
    };

    const exportPayroll = (format) => {
        toast.success(`Payroll exported as ${format.toUpperCase()}`);
    };

    const getTotalPayroll = () => {
        return employees.reduce((total, employee) => {
            const payroll = calculatePayroll(employee);
            return total + payroll.netPay;
        }, 0);
    };

    const getTotalDeductions = () => {
        return employees.reduce((total, employee) => {
            const payroll = calculatePayroll(employee);
            return total + payroll.totalDeductions;
        }, 0);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'badge-warning';
            case 'calculated': return 'badge-info';
            case 'processed': return 'badge-success';
            default: return 'badge-ghost';
        }
    };

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaMoneyBillWave className="text-primary" />
                        Payroll System
                    </h1>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => exportPayroll('pdf')}
                            className="btn btn-outline btn-sm"
                        >
                            <FaDownload /> Export PDF
                        </button>
                        <button 
                            onClick={() => exportPayroll('excel')}
                            className="btn btn-outline btn-sm"
                        >
                            <FaDownload /> Export Excel
                        </button>
                    </div>
                </div>

                {/* Payroll Period and Status */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    <div className="card bg-base-200 shadow-md">
                        <div className="card-body">
                            <h3 className="card-title text-lg">Payroll Period</h3>
                            <div className="space-y-2">
                                <div>
                                    <label className="label-text text-sm">Start Date</label>
                                    <input
                                        type="date"
                                        className="input input-bordered input-sm w-full"
                                        value={payrollPeriod.startDate}
                                        onChange={(e) => setPayrollPeriod({...payrollPeriod, startDate: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="label-text text-sm">End Date</label>
                                    <input
                                        type="date"
                                        className="input input-bordered input-sm w-full"
                                        value={payrollPeriod.endDate}
                                        onChange={(e) => setPayrollPeriod({...payrollPeriod, endDate: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-md">
                        <div className="card-body">
                            <h3 className="card-title text-lg">Payroll Status</h3>
                            <div className="space-y-4">
                                <div className={`badge ${getStatusColor(payrollStatus)} p-3`}>
                                    {payrollStatus.toUpperCase()}
                                </div>
                                <button 
                                    onClick={processPayroll}
                                    className="btn btn-primary btn-sm w-full"
                                    disabled={payrollStatus === 'processed'}
                                >
                                    <FaCalculator />
                                    {payrollStatus === 'draft' ? 'Calculate Payroll' : 
                                     payrollStatus === 'calculated' ? 'Process Payroll' : 'Processed'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-md">
                        <div className="card-body">
                            <h3 className="card-title text-lg">Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Employees:</span>
                                    <span className="font-semibold">{employees.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Gross:</span>
                                    <span className="font-semibold">${(getTotalPayroll() + getTotalDeductions()).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Deductions:</span>
                                    <span className="font-semibold text-error">${getTotalDeductions().toFixed(2)}</span>
                                </div>
                                <div className="divider my-1"></div>
                                <div className="flex justify-between font-bold">
                                    <span>Total Net Pay:</span>
                                    <span className="text-success">${getTotalPayroll().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-primary">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title">Active Employees</div>
                        <div className="stat-value text-primary">{employees.filter(e => e.status === 'active').length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-success">
                            <MdPayment className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Payroll</div>
                        <div className="stat-value text-success">${getTotalPayroll().toFixed(0)}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-warning">
                            <MdSchedule className="text-3xl" />
                        </div>
                        <div className="stat-title">Avg Hours</div>
                        <div className="stat-value text-warning">
                            {employees.length > 0 ? Math.round(employees.reduce((sum, e) => sum + e.hoursWorked, 0) / employees.length) : 0}
                        </div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-info">
                            <MdAccountBalance className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Deductions</div>
                        <div className="stat-value text-info">${getTotalDeductions().toFixed(0)}</div>
                    </div>
                </div>

                {/* Employee Payroll Table */}
                <div className="card bg-base-200 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Employee Payroll Details</h2>
                        
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Position</th>
                                        <th>Hours</th>
                                        <th>Overtime</th>
                                        <th>Gross Pay</th>
                                        <th>Deductions</th>
                                        <th>Net Pay</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map(employee => {
                                        const payroll = calculatePayroll(employee);
                                        return (
                                            <tr key={employee.id}>
                                                <td>
                                                    <div>
                                                        <div className="font-bold">{employee.name}</div>
                                                        <div className="text-sm text-gray-500">{employee.employeeId}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <div className="font-medium">{employee.position}</div>
                                                        <div className="text-sm text-gray-500">{employee.department}</div>
                                                    </div>
                                                </td>
                                                <td>{employee.hoursWorked}h</td>
                                                <td>{employee.overtimeHours}h</td>
                                                <td className="font-semibold">${payroll.grossPay.toFixed(2)}</td>
                                                <td className="text-error">${payroll.totalDeductions.toFixed(2)}</td>
                                                <td className="font-bold text-success">${payroll.netPay.toFixed(2)}</td>
                                                <td>
                                                    <button 
                                                        onClick={() => generatePayslip(employee)}
                                                        className="btn btn-sm btn-info"
                                                    >
                                                        <FaEye /> Payslip
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Payslip Modal */}
                {showPayslipModal && selectedEmployee && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-2xl">
                            <h3 className="font-bold text-lg mb-4">Payslip - {selectedEmployee.name}</h3>
                            
                            <div className="space-y-4">
                                {/* Employee Info */}
                                <div className="grid grid-cols-2 gap-4 p-4 bg-base-100 rounded">
                                    <div>
                                        <div className="text-sm text-gray-500">Employee ID</div>
                                        <div className="font-semibold">{selectedEmployee.employeeId}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Position</div>
                                        <div className="font-semibold">{selectedEmployee.position}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Department</div>
                                        <div className="font-semibold">{selectedEmployee.department}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Pay Period</div>
                                        <div className="font-semibold">
                                            {new Date(payrollPeriod.startDate).toLocaleDateString()} - {new Date(payrollPeriod.endDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                {/* Earnings */}
                                <div>
                                    <h4 className="font-bold mb-2">Earnings</h4>
                                    <div className="space-y-2">
                                        {selectedEmployee.baseSalary ? (
                                            <div className="flex justify-between">
                                                <span>Base Salary</span>
                                                <span>${selectedEmployee.baseSalary.toFixed(2)}</span>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between">
                                                <span>Regular Hours ({selectedEmployee.hoursWorked}h @ ${selectedEmployee.hourlyRate}/h)</span>
                                                <span>${(selectedEmployee.hoursWorked * selectedEmployee.hourlyRate).toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span>Overtime ({selectedEmployee.overtimeHours}h @ ${(selectedEmployee.hourlyRate * 1.5).toFixed(2)}/h)</span>
                                            <span>${(selectedEmployee.overtimeHours * selectedEmployee.hourlyRate * 1.5).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Bonuses</span>
                                            <span>${selectedEmployee.bonuses.toFixed(2)}</span>
                                        </div>
                                        <div className="divider my-2"></div>
                                        <div className="flex justify-between font-bold">
                                            <span>Gross Pay</span>
                                            <span>${calculatePayroll(selectedEmployee).grossPay.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Deductions */}
                                <div>
                                    <h4 className="font-bold mb-2">Deductions</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Federal Tax</span>
                                            <span className="text-error">${selectedEmployee.deductions.tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Health Insurance</span>
                                            <span className="text-error">${selectedEmployee.deductions.insurance.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Retirement (401k)</span>
                                            <span className="text-error">${selectedEmployee.deductions.retirement.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Other Deductions</span>
                                            <span className="text-error">${selectedEmployee.deductions.other.toFixed(2)}</span>
                                        </div>
                                        <div className="divider my-2"></div>
                                        <div className="flex justify-between font-bold">
                                            <span>Total Deductions</span>
                                            <span className="text-error">${calculatePayroll(selectedEmployee).totalDeductions.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Net Pay */}
                                <div className="p-4 bg-success text-success-content rounded">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">Net Pay</span>
                                        <span className="text-2xl font-bold">${calculatePayroll(selectedEmployee).netPay.toFixed(2)}</span>
                                    </div>
                                    <div className="text-sm mt-1">
                                        Direct deposit to account: {selectedEmployee.bankAccount}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-action">
                                <button 
                                    onClick={() => toast.success('Payslip downloaded')}
                                    className="btn btn-primary"
                                >
                                    <FaDownload /> Download PDF
                                </button>
                                <button 
                                    onClick={() => setShowPayslipModal(false)}
                                    className="btn"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PayrollSystem;