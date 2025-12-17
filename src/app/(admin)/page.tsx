// src/app/(admin)/page.tsx
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlyRevenue from "@/components/ecommerce/MonthlyRevenue";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title: "Next.js E-commerce Dashboard | TailAdmin",
  description: "Dashboard page",
};

export default async function Ecommerce() {
  //  Get session
  const session = await getServerSession(authOptions);

  //  Session  login page 
  if (!session || !session.accessToken) {
    redirect("/signin");
  }

  const token = session.accessToken;

  //  Secure API call
  const res = await fetch("http://localhost:3000/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });


   




  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const data = await res.json();

 // console.log("dashbord res ", data)

  //  Props 
  return (
    <div className="h-full w-full space-y-6">
  {/* Metrics */}
  <div className="col-span-12 space-y-6 xl:col-span-7">
    <EcommerceMetrics data={data} />
  </div>

  {/* Recent Orders + Monthly Revenue */}
  <div className="flex flex-col lg:flex-row gap-6 mt-6">
    {/* Recent Orders Table */}
    <div className="flex-1">
      <RecentOrders data={data} />
    </div>

    {/* Monthly Revenue Card */}
    <div className="w-full lg:w-1/3">
      <MonthlyRevenue monthlyRevenue={data.monthlyRevenue} />
    </div>
  </div>
</div>

  );
}
