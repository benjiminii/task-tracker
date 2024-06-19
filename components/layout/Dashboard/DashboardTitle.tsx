"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import taskStore from "@/store/taskStore";

import { toast } from "sonner";

function DashboardTitle() {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");

  const { createTask } = taskStore();

  function handleCreateTask() {
    if (taskName.length < 5) {
      toast.error("Task name must be at least 5 characters");
      return;
    }
    // task is added to the state store
    createTask(taskName, "user");
    setOpen(false);
  }

  return (
    <section className="container flex justify-between items-center mt-6">
      <h1 className="text-2xl md:text-3xl">Task Dashboard</h1>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex gap-3">
            <CirclePlus />
            Add Task
          </Button>
        </DialogTrigger>

        <DialogContent className="text-black">
          <Label>What is the tasks name?</Label>
          <Input
            placeholder="Task name"
            className="w-full"
            type="text"
            onChange={(e) => setTaskName(e.target.value)}
            minLength={5}
          />
          <Button className="w-full" onClick={handleCreateTask}>
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default DashboardTitle;
