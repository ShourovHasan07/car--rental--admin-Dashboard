"use client";

import React from "react";

const MonthlyRevenue = ({ monthlyRevenue }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 p-5 md:p-6 shadow">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Monthly Revenue
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Revenue for the current month
      </p>

      <h1 className="text-4xl font-bold text-blue-500 dark:text-blue-400">
        ৳{monthlyRevenue?.toLocaleString() ?? 0}
      </h1>
    </div>
  );
};

export default MonthlyRevenue;
