import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { TaskItem } from '../task-item/task-item';
import type { User } from '../../../users/models/user.model';
import type { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  // TaskList gère la liste ; TaskItem affiche chaque tâche.
  imports: [EmptyState, TaskItem],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  private readonly userService = inject(UserService);

  readonly tasks = input.required<Task[]>();
  readonly showAssignee = input(true);
  // Ajoute l'identifiant pour que le parent sache quelle tâche mettre à jour.
  readonly taskStatusChange = output<{ taskId: number; status: TaskStatus }>();
  private readonly users = signal<User[]>([]);

  ngOnInit(): void {
    // The service remains the single source used to resolve assignee names.
    this.userService.getUsers().subscribe((users) => this.users.set(users));
  }

  assigneeName(assigneeId?: number): string {
    if (assigneeId === undefined) {
      return 'Non assignée';
    }

    return this.users().find((user) => user.id === assigneeId)?.name ?? 'Utilisateur inconnu';
  }
}

