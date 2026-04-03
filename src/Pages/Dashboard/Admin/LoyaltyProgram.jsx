import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaGift, FaAward, FaStar, FaMedal } from "react-icons/fa";
import Swal from "sweetalert2";

const LoyaltyProgram = () => {
    // Dummy loyalty data
    const [loyaltyMembers, setLoyaltyMembers] = useState([
        { id: 1, name: "Alice Johnson", email: "alice@example.com", points: 2450, tier: "Gold", joinedDate: "2023-01-15", lifetimeValue: "$1,245.00" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", points: 820, tier: "Silver", joinedDate: "2023-06-22", lifetimeValue: "$340.50" },
        { id: 3, name: "Charlie Davis", email: "charlie@example.com", points: 5100, tier: "Platinum", joinedDate: "2022-11-05", lifetimeValue: "$2,890.00" },
        { id: 4, name: "Diana Prince", email: "diana@example.com", points: 150, tier: "Bronze", joinedDate: "2024-02-10", lifetimeValue: "$85.00" },
        { id: 5, name: "Ethan Hunt", email: "ethan@example.com", points: 3100, tier: "Gold", joinedDate: "2023-03-30", lifetimeValue: "$1,650.00" },
    ]);

    const getTierBadge = (tier) => {
        switch(tier) {
            case 'Platinum': return <div className="badge badge-lg bg-slate-800 text-white font-bold gap-1"><FaStar className="text-yellow-400"/> Platinum</div>;
            case 'Gold': return <div className="badge badge-lg bg-yellow-400 text-yellow-900 border-none font-bold gap-1"><FaMedal /> Gold</div>;
            case 'Silver': return <div className="badge badge-lg bg-gray-300 text-gray-800 border-none font-bold gap-1"><FaMedal /> Silver</div>;
            case 'Bronze': return <div className="badge badge-lg bg-amber-700 text-orange-100 border-none font-bold gap-1"><FaMedal /> Bronze</div>;
            default: return <div className="badge badge-ghost font-bold">{tier}</div>;
        }
    };

    const handleReward = (member) => {
        Swal.fire({
            title: `Issue Reward to ${member.name}?`,
            text: `They currently have ${member.points} points.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Issue Reward!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Rewarded!',
                    `${member.name} has been sent a reward notification.`,
                    'success'
                );
            }
        });
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <Helmet>
                <title>Loyalty Program - Local Chef Bazaar</title>
            </Helmet>
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                        <FaAward className="text-primary" /> Loyalty Program
                    </h2>
                    <p className="text-gray-500 mt-1">Manage customer points, tiers, and rewards</p>
                </div>
                <button className="btn btn-outline btn-primary">
                    Program Settings
                </button>
            </div>

            {/* Loyalty Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="stat bg-purple-50 rounded-xl shadow-sm border border-purple-100 p-4">
                    <div className="stat-figure text-purple-600">
                        <FaStar className="text-3xl" />
                    </div>
                    <div className="stat-title text-purple-800 font-semibold">Total Members</div>
                    <div className="stat-value text-purple-600">{loyaltyMembers.length + 1245}</div>
                    <div className="stat-desc">↗︎ 40 (2%) this month</div>
                </div>
                <div className="stat bg-green-50 rounded-xl shadow-sm border border-green-100 p-4">
                    <div className="stat-figure text-green-600">
                        <FaAward className="text-3xl" />
                    </div>
                    <div className="stat-title text-green-800 font-semibold">Points Issued</div>
                    <div className="stat-value text-green-600">1.2M</div>
                    <div className="stat-desc">Lifetime accumulated points</div>
                </div>
                <div className="stat bg-orange-50 rounded-xl shadow-sm border border-orange-100 p-4">
                    <div className="stat-figure text-orange-600">
                        <FaGift className="text-3xl" />
                    </div>
                    <div className="stat-title text-orange-800 font-semibold">Rewards Claimed</div>
                    <div className="stat-value text-orange-600">4,320</div>
                    <div className="stat-desc">Rewards redeemed to date</div>
                </div>
            </div>

            {/* Loyalty Strategy Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 font-semibold text-gray-700">
                    Top Loyalty Members
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Customer Info</th>
                                <th>Tier</th>
                                <th>Points Balance</th>
                                <th>Lifetime Value</th>
                                <th>Joined</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loyaltyMembers.map(member => (
                                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                    <span className="text-xs">{member.name.substring(0, 2).toUpperCase()}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{member.name}</div>
                                                <div className="text-sm opacity-50">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{getTierBadge(member.tier)}</td>
                                    <td>{member.points.toLocaleString()} pts</td>
                                    <td className="font-medium text-green-600">{member.lifetimeValue}</td>
                                    <td className="text-sm text-gray-500">{new Date(member.joinedDate).toLocaleDateString()}</td>
                                    <td className="text-center">
                                        <button 
                                            onClick={() => handleReward(member)}
                                            className="btn btn-sm btn-primary btn-outline"
                                            title="Issue Reward"
                                        >
                                            <FaGift className="mr-1"/> Reward
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LoyaltyProgram;
