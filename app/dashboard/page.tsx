"use client";

import authStore from "@/store/authStore";
import { redirect } from "next/navigation";

function Dashboard() {
  const { user, isAuthenticated } = authStore();

  console.log(user);

  if (!isAuthenticated) redirect("/");

  return <div>Dashboard</div>;
}

export default Dashboard;
