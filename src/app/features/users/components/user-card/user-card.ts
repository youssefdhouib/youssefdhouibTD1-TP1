import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import type { Project } from '../../../projects/models/project.model';
import type { Task } from '../../../projects/models/task.model';
import type { User } from '../../models/user.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { InitialsPipe } from '../../../../shared/pipes/initials-pipe';

@Component({
  selector: 'app-user-card',
  standalone: true,
  // Pipes intégrés utilisés pour formater le nom et l'adresse email.
  imports: [UserProjectGroup, EmptyState, TitleCasePipe, LowerCasePipe, InitialsPipe],
  styleUrl: './user-card.css',
  templateUrl: './user-card.html',
  host: { class: 'block h-full' },
})
export class UserCard {
  readonly user = input.required<User>();
  readonly projects = input.required<Project[]>();
  readonly userSelected = output<User>();

  // Flatten all project tasks, then keep only tasks assigned to this user.
  readonly assignedTasks = computed<Task[]>(() =>
    this.projects()
      .flatMap((project) => project.tasks)
      .filter((task) => task.assigneeId === this.user().id),
  );

  readonly pendingCount = computed(
    () => this.assignedTasks().filter((task) => task.status === 'En attente').length,
  );
  readonly inProgressCount = computed(
    () => this.assignedTasks().filter((task) => task.status === 'En cours').length,
  );
  readonly completedCount = computed(
    () => this.assignedTasks().filter((task) => task.status === 'Terminé').length,
  );

  // Empty projects are removed so @empty can handle users without tasks.
  readonly projectGroups = computed(() =>
    this.projects()
      .map((project) => ({
        project,
        tasks: project.tasks.filter((task) => task.assigneeId === this.user().id),
      }))
      .filter((group) => group.tasks.length > 0),
  );

  selectUser(): void {
    this.userSelected.emit(this.user());
  }
}
