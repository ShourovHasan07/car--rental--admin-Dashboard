"use client";

import React from "react";
import Image from "next/image"; // ✅ FIX 1
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon } from "@/icons";

import car from "../../../public/assets/Group 5339.png";
import booking from "../../../public/assets/Group 5340.png";
import Pending from "../../../public/assets/Group 5341 (2).png";
import completedBookings from "../../../public/assets/Group 5342.png";

interface EcommerceMetricsProps {
  data: {
    totalCars: number;
    totalBookings: number;
  };
}

export const EcommerceMetrics = ({ data }: EcommerceMetricsProps) => {
  return (
    <div className="grid grid-rows-1 gap-4 sm:grid-cols-2 md:gap-6">
      
     

      
      


      {/* Completed Bookings */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        
        {/* Header */}
        <div className="flex items-center gap-9">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
         Monthly Revenue
          </h3>

          <p>Revenue for current month</p>
    
          
        </div>

        {/* Value */}
        <div className="flex items-end justify-between mt-5">
          <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
           $ {data?.monthlyRevenue ?? 0}
          </h4>

          
        </div>
      </div>
    </div>
  );
};
