"use client";

import React from "react";
import Image from "next/image";

import car from "../../../public/assets/Group 5339.png";
import booking from "../../../public/assets/Group 5340.png";
import pending from "../../../public/assets/Group 5341 (2).png";
import completed from "../../../public/assets/Group 5342.png";

interface EcommerceMetricsProps {
  data: {
    totalCars: number;
    totalBookings: number;
    pendingBookings: number;
    completedBookings: number;
  };
}

export const EcommerceMetrics = ({ data }: EcommerceMetricsProps) => {
  const metrics = [
    { title: "Total Cars", value: data?.totalCars ?? 0, icon: car },
    { title: "Total Bookings", value: data?.totalBookings ?? 0, icon: booking },
    { title: "Pending Bookings", value: data?.pendingBookings ?? 0, icon: pending },
    { title: "Completed Bookings", value: data?.completedBookings ?? 0, icon: completed },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {metrics.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {item.title}
            </h3>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
              <Image src={item.icon} alt={item.title} width={40} height={40} />
            </div>
          </div>

          <h4 className="mt-5 text-title-sm font-bold text-gray-800 dark:text-white/90">
            {item.value}
          </h4>
        </div>
      ))}
    </div>
  );
};
