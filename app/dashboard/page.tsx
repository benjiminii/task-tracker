"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import authStore from "@/store/authStore";

import DashboardChart from "@/components/layout/Dashboard/DashboardChart";
import DashboardStats from "@/components/layout/Dashboard/DashboardStats";
import DashboardTitle from "@/components/layout/Dashboard/DashboardTitle";

function Dashboard() {
  const { isAuthenticated } = authStore();

  useEffect(() => {
    if (!isAuthenticated) redirect("/");
  }, [isAuthenticated]);

  return (
    <main className="min-h-screen text-black">
      <DashboardTitle />
      <DashboardStats />
      <DashboardChart />
    </main>
  );
}

export default Dashboard;
