// Union types restrict values to the priorities and statuses required by the TP.
export type TaskPriority = 'Haute' | 'Moyenne' | 'Basse';

export type TaskStatus = 'En attente' | 'En cours' | 'Terminé';

// Describes one task; interfaces check types without creating runtime objects.
export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId?: number;

  // TP3
  dueDate?: string;
  description?: string;
}

