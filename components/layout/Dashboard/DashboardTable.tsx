import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import authStore from "@/store/authStore";
import taskStore, { Task } from "@/store/taskStore";
import dayjs from "dayjs";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import Card from "../Card";

function DashboardTable() {
  const { tasks, deleteTask, toggleTaskCompletion } = taskStore();
  const { user } = authStore();

  // Users can only complete their own tasks
  // Only admin users can complete all tasks
  function handleTaskComplete(task: Task) {
    const { id } = task;
    if (user?.userType === "admin") {
      toggleTaskCompletion(id);
    } else if (user?.email === task.email) {
      toggleTaskCompletion(id);
    } else
      toast.error("Normal users are not authorized to complete others task");
  }

  // Users can only delete their own tasks
  // Only admin users can delete all tasks
  function handleTaskDelete(task: Task) {
    const { id } = task;
    if (user?.userType === "admin") {
      deleteTask(id);
    } else if (user?.email === task.email) {
      deleteTask(id);
    } else toast.error("Normal users are not authorized to delete others task");
  }

  return (
    <section className="container">
      <Card className="overflow-y-auto h-[30rem]">
        <Table>
          <TableCaption>A list of your tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.email}</TableCell>
                <TableCell>{dayjs(task.date).format("YYYY/MM/DD")}</TableCell>
                <TableCell>
                  {task.completed ? "Completed" : "Not completed"}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    className={cn(
                      "bg-green-500",
                      task.completed && "opacity-50 pointer-events-none"
                    )}
                    onClick={() => !task.completed && handleTaskComplete(task)}
                  >
                    <Check color="black" />
                  </Button>
                  <Button
                    className="bg-red-500"
                    onClick={() => handleTaskDelete(task)}
                  >
                    <X color="black" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}

export default DashboardTable;
