"use client";

import * as echarts from "echarts";
import taskStore from "@/store/taskStore";
import { useEffect, useMemo } from "react";
import DashboardTable from "./DashboardTable";
import Card from "../Card";

function DashboardChart() {
  const { tasks } = taskStore();

  // Pie chart data
  const completedTasks = tasks.filter((task) => task.completed).length;
  const uncompletedTasks = tasks.filter((task) => !task.completed).length;

  // useMemo to make sure unneccesary re-renders are avoided
  const pieChartOptions = useMemo(() => {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      series: [
        {
          type: "pie",
          data: [
            { value: completedTasks, name: "Completed tasks" },
            { value: uncompletedTasks, name: "Uncompleted tasks" },
          ],
        },
      ],
    };
  }, [completedTasks, uncompletedTasks]);

  useEffect(() => {
    const chartDom = document.getElementById("pie-chart");
    const myChart = echarts.init(chartDom);
    myChart.setOption(pieChartOptions);

    return () => {
      // Clean up
      myChart.dispose();
    };
    //run effect everytime pieChartOptions changes
  }, [pieChartOptions]);

  return (
    <div className="container grid xl:grid-cols-2 gap-6">
      <Card className="xl:col-span-1 h-[30rem]">
        <div id="pie-chart" className="w-full" />
      </Card>
      <Card className="xl:col-span-1 overflow-y-auto h-[30rem]">
        <DashboardTable />
      </Card>
    </div>
  );
}

export default DashboardChart;
