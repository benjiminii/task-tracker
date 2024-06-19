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
import taskStore from "@/store/taskStore";
import dayjs from "dayjs";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

function DashboardTable() {
  const { tasks, deleteTask, toggleTaskCompletion } = taskStore();
  const { user } = authStore();

  // Only admin users can delete tasks
  function handleTaskDelete(taskId: string) {
    if (user?.userType === "admin") {
      deleteTask(taskId);
    } else toast.error("Normal users are not authorized to delete tasks");
  }

  return (
    <Table>
      <TableCaption>A list of your tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
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
                onClick={() => !task.completed && toggleTaskCompletion(task.id)}
              >
                <Check color="black" />
              </Button>
              <Button
                className="bg-red-500"
                onClick={() => handleTaskDelete(task.id)}
              >
                <X color="black" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DashboardTable;
