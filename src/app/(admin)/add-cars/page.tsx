import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import AddCarForm from "@/components/add Car/AddCarForm";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  // Get session (SERVER SIDE)
  const session = await getServerSession(authOptions);

  // Protect route
  if (!session || !session.accessToken) {
    redirect("/signin");
  }

  const token = session.accessToken;

  return (
    <div className="p-6">
      <AddCarForm token={token} />
    </div>
  );
}
