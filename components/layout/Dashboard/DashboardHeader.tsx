"use client";

import { cn } from "@/lib/utils";
import { User as UserIcon, LogOut as LogOutIcon } from "lucide-react";
import authStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DashboardHeader() {
  const { user, logout } = authStore();
  const { email, userType } = user || {};

  return (
    <Popover>
      <header className={cn("sticky bg-stable-secondary py-2")}>
        <PopoverTrigger className="py-2 px-8 hover:bg-gray-500 rounded-md flex gap-2">
          <div className="bg-stable-blue rounded-full p-3">
            <UserIcon size={30} />
          </div>
          <div className="grid place-items-start">
            <p className="capitalize">{userType}</p>
            <p>{email}</p>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-fit">
          <Button className="flex gap-3" onClick={logout}>
            <LogOutIcon size={30} />
            Log out
          </Button>
        </PopoverContent>
      </header>
    </Popover>
  );
}

export default DashboardHeader;
