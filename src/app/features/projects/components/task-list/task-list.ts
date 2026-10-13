import { DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { DeadlinePipe } from '../../../../shared/pipes/deadline-pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import type { User } from '../../../users/models/user.model';
import type { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  // DatePipe est importé car TaskList est un composant standalone.
  imports: [EmptyState, DatePipe, TruncatePipe, DeadlinePipe],
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit {
  private readonly userService = inject(UserService);

  readonly tasks = input.required<Task[]>();
  readonly showAssignee = input(true);
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

