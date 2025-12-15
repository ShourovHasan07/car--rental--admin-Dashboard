// src/app/(admin)/page.tsx
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
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

  // 2️⃣ Session না থাকলে login page এ পাঠাও
  if (!session || !session.accessToken) {
    redirect("/signin");
  }

  const token = session.accessToken;

  // 3️⃣ Secure API call
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

  console.log("dashbord res ", data)

  //  Props 
  return (
    <div className="h-full w-full">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics  data={data} />
        
      </div>




     



      {/* <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget data={data} />
      </div> */}

      <div className="col-span-12">
        <StatisticsChart data={data.statistics} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard data={data.demographics} />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders data={data.recentOrders} />
      </div>
    </div>
  );
}
