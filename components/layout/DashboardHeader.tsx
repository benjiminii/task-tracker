"use client";

import { cn } from "@/lib/utils";
import { User as UserIcon, LogOut as LogOutIcon } from "lucide-react";
import authStore from "@/store/authStore";
import { Button } from "../ui/button";

function DashboardHeader() {
  const { user, logout } = authStore();
  const { email, userType } = user || {};

  return (
    <header
      className={cn(
        "flex justify-between items-center sticky bg-stable-blue py-4 px-8"
      )}
    >
      <div className="flex justify-start items-center gap-2 ">
        <div className="bg-gray-400 rounded-full p-3">
          <UserIcon size={30} />
        </div>
        <div className="grid place-items-start">
          <p className="capitalize">{userType}</p>
          <p>{email}</p>
        </div>
      </div>

      <Button className="flex gap-3" onClick={logout}>
        <LogOutIcon size={30} />
        Log out
      </Button>
    </header>
  );
}

export default DashboardHeader;
