"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import authStore from "@/store/authStore";

import DashboardStats from "@/components/layout/Dashboard/DashboardStats";
import DashboardTitle from "@/components/layout/Dashboard/DashboardTitle";
import DashboardTable from "@/components/layout/Dashboard/DashboardTable";

function Dashboard() {
  const { isAuthenticated } = authStore();

  useEffect(() => {
    if (!isAuthenticated) redirect("/");
  }, [isAuthenticated]);

  return (
    <main className="min-h-screen text-black">
      <DashboardTitle />
      <DashboardStats />
      <DashboardTable />
    </main>
  );
}

export default Dashboard;
