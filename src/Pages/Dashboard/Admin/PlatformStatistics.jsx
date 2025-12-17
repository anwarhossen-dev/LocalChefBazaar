import { BarChart3, ChefHat, PackageCheck, ShoppingBag, Users } from "lucide-react";
import React from "react";

const PlatformStatistics = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Platform Statistics
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="text-orange-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">$1.2K</h3>
          <p className="text-gray-600">Total Payment</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-blue-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">34</h3>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="text-purple-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">03</h3>
          <p className="text-gray-600">Orders Pending</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <PackageCheck className="text-green-600" size={32}/>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">103</h3>
          <p className="text-gray-600">Orders Delivered</p>
        </div>
        
      </div>
      {/* <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((activity) => (
            <div
              key={activity}
              className="flex items-center justify-between py-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium text-gray-800">New order placed</p>
                <p className="text-sm text-gray-500">{activity} hour ago</p>
              </div>
              <span className="text-green-600 font-semibold">+$25.99</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default PlatformStatistics;