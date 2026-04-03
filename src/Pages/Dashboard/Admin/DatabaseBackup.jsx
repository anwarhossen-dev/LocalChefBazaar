import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MdBackup, MdRestore, MdDownload, MdCloudDone, MdCloudUpload } from "react-icons/md";
import { FaDatabase, FaHistory } from "react-icons/fa";
import Swal from "sweetalert2";

const DatabaseBackup = () => {
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);

    const [backupHistory, setBackupHistory] = useState([
        { id: "BKP-20240402", date: "2024-04-02 02:00 AM", size: "245 MB", type: "Automatic", status: "Success" },
        { id: "BKP-20240401", date: "2024-04-01 02:00 AM", size: "242 MB", type: "Automatic", status: "Success" },
        { id: "BKP-20240328", date: "2024-03-28 14:35 PM", size: "235 MB", type: "Manual", status: "Success" },
        { id: "BKP-20240327", date: "2024-03-27 02:00 AM", size: "232 MB", type: "Automatic", status: "Warning" },
        { id: "BKP-20240320", date: "2024-03-20 10:15 AM", size: "215 MB", type: "Manual", status: "Success" },
    ]);

    const handleRunBackup = () => {
        setIsBackingUp(true);
        setTimeout(() => {
            const newBackup = {
                id: `BKP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
                date: new Date().toLocaleString(),
                size: "248 MB",
                type: "Manual",
                status: "Success"
            };
            setBackupHistory([newBackup, ...backupHistory]);
            setIsBackingUp(false);
            
            Swal.fire({
                title: 'Backup Completed!',
                text: 'The database has been successfully backed up securely to the cloud.',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            });
        }, 2000);
    };

    const handleRestore = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `This will overwrite current data with the backup ${id}. This action is highly destructive!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Restore Now!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Restoring Data',
                    'The system is reverting to the selected backup state. (Demo only)',
                    'info'
                );
            }
        });
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <Helmet>
                <title>Database Backup - Local Chef Bazaar</title>
            </Helmet>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
                        <MdBackup className="text-primary" /> Database Backup
                    </h2>
                    <p className="text-gray-500 mt-1">Manage system snapshots, backups, and restores</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {/* Actions Panel */}
                <div className="col-span-1 border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col items-center text-center">
                    <MdCloudUpload className="text-7xl text-blue-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Run Manual Backup</h3>
                    <p className="text-sm text-gray-500 mb-6">Instantly create a secure copy of all user data, orders, and chef listings.</p>
                    
                    <button 
                        className="btn btn-primary w-full" 
                        onClick={handleRunBackup}
                        disabled={isBackingUp}
                    >
                        {isBackingUp ? (
                            <><span className="loading loading-spinner"></span> Backing Up Data...</>
                        ) : (
                            <><MdBackup className="text-lg" /> Create Backup Now</>
                        )}
                    </button>
                    
                    <div className="divider mt-6 mb-4">Settings</div>
                    
                    <div className="w-full flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="text-sm font-semibold text-gray-700">Daily Auto Backup</span>
                        <input 
                            type="checkbox" 
                            className="toggle toggle-success toggle-sm" 
                            checked={autoBackupEnabled}
                            onChange={() => setAutoBackupEnabled(!autoBackupEnabled)}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-left w-full">Runs automatically every day at 02:00 AM server time.</p>
                </div>

                {/* Status & Storage */}
                <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm text-white">
                        <div className="card-body">
                            <h2 className="card-title text-indigo-100 mb-4"><FaDatabase /> Server Storage</h2>
                            <div className="text-4xl font-bold mb-2">42% Used</div>
                            <progress className="progress progress-success w-full bg-indigo-900/40" value="42" max="100"></progress>
                            <div className="flex justify-between text-sm mt-2 text-indigo-100">
                                <span>210 GB utilized</span>
                                <span>500 GB total capacity</span>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm border border-gray-100">
                        <div className="card-body">
                            <h2 className="card-title text-gray-700 mb-4"><MdCloudDone className="text-green-500" /> Latest Status</h2>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Last Successful Backup:</p>
                                <div className="font-semibold text-lg text-gray-800">{backupHistory[0].date}</div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-1">Total System Size:</p>
                                <div className="font-semibold text-lg text-gray-800">{backupHistory[0].size}</div>
                            </div>
                        </div>
                    </div>

                    {/* History Table directly embedded here for space-filling */}
                    <div className="md:col-span-2 card bg-base-100 shadow-sm border border-gray-100">
                        <div className="card-body p-0">
                            <h2 className="card-title p-6 pb-2 text-gray-800"><FaHistory /> Backup History</h2>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead className="bg-gray-50 text-gray-600">
                                        <tr>
                                            <th>Backup ID</th>
                                            <th>Date & Time</th>
                                            <th>Trigger</th>
                                            <th>Size</th>
                                            <th>Status</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {backupHistory.map((bkp, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="font-mono text-sm">{bkp.id}</td>
                                                <td>{bkp.date}</td>
                                                <td>
                                                    <span className={`badge badge-sm ${bkp.type === 'Automatic' ? 'badge-ghost' : 'badge-primary'}`}>
                                                        {bkp.type}
                                                    </span>
                                                </td>
                                                <td className="font-medium text-gray-600">{bkp.size}</td>
                                                <td>
                                                    <span className={`badge badge-sm ${
                                                        bkp.status === 'Success' ? 'badge-success text-white' : 'badge-warning'
                                                    }`}>
                                                        {bkp.status}
                                                    </span>
                                                </td>
                                                <td className="text-right">
                                                    <button className="btn btn-sm btn-ghost text-blue-600" title="Download Backup">
                                                        <MdDownload className="text-lg" />
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-ghost text-red-600 ml-1" 
                                                        title="Restore from this backup"
                                                        onClick={() => handleRestore(bkp.id)}
                                                    >
                                                        <MdRestore className="text-lg" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatabaseBackup;
