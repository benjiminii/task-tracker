"use client";

import DashboardStats from "@/components/layout/Dashboard/DashboardStats";
import DashboardTitle from "@/components/layout/Dashboard/DashboardTitle";
import authStore from "@/store/authStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function Dashboard() {
  const { isAuthenticated } = authStore();

  useEffect(() => {
    if (!isAuthenticated) redirect("/");
  }, [isAuthenticated]);

  return (
    <main className="min-h-screen text-black">
      <DashboardTitle />
      <DashboardStats />
    </main>
  );
}

export default Dashboard;
