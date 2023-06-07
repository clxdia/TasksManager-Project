"use client";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  desc: string;
  due_date: number;
  priority: string;
  tags: string[];
}

async function fetchData(url: string): Promise<Task[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function TasksPage(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await fetchData(
          `${process.env.MONGODB_URL}/tasks`
        );
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
