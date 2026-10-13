import type { Task, TaskStatus } from './task.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
  tasks: Task[];

  // TP3
  startDate: string;
  budget: number;
}
