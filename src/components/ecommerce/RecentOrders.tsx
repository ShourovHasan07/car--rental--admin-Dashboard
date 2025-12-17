"use client";

import Image from "next/image";
import { Booking } from "@/types/dashboard";

interface Props {
  data?: {
    recentBookings?: Booking[];
  };
}

export default function RecentOrders({ data }: Props) {
  const recentBookings = data?.recentBookings ?? [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
        Recent Bookings
      </h2>

      {recentBookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-6">
          No recent bookings found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500 dark:text-gray-400">
                <th className="py-3">Car</th>
                <th>Status</th>
                <th>Price</th>
                <th>Pickup</th>
                <th>Return</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="flex items-center gap-3 py-4">
                    <Image
                      src={booking.car.carImage}
                      alt={booking.car.brand}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                      unoptimized
                    />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100">
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {booking.car.category}
                      </p>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                            : booking.status === "active"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="font-medium text-gray-800 dark:text-gray-100">
                    ৳{booking.price.toLocaleString()}
                  </td>
                  <td className="text-gray-600 dark:text-gray-300">
                    {booking.pickupLocation}
                  </td>
                  <td className="text-gray-600 dark:text-gray-300">
                    {booking.returnLocation}
                  </td>
                  <td className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
