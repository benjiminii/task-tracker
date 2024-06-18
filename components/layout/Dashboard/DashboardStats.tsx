import Card from "@/components/layout/Card";
import { cn } from "@/lib/utils";
import taskStore from "@/store/taskStore";
import { ListChecks, ClipboardList, LayoutList } from "lucide-react";

function DashboardStats() {
  const { tasks } = taskStore();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const uncompletedTasks = tasks.filter((task) => !task.completed).length;

  const taskData = [
    {
      title: "Total Tasks",
      amount: totalTasks,
      iconColor: "bg-yellow-500",
      icon: <ClipboardList size={40} />,
    },

    {
      title: "Completed Tasks",
      amount: completedTasks,
      iconColor: "bg-green-500",
      icon: <ListChecks size={40} />,
    },
    {
      title: "Uncompleted Tasks",
      amount: uncompletedTasks,
      iconColor: "bg-red-500",
      icon: <LayoutList size={40} />,
    },
  ];

  return (
    <section
      className={cn("container grid md:grid-cols-3 gap-6 text-black !pt-0")}
    >
      {taskData.map(({ title, amount, iconColor, icon }) => (
        <Card className="flex items-center gap-2">
          <div className={cn("p-2 rounded-md bg-", iconColor)}>{icon}</div>
          <div>
            <p>{title}</p>
            {amount}
          </div>
        </Card>
      ))}
    </section>
  );
}

export default DashboardStats;
