import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProjectService } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

import type { TaskStatus } from '../../../projects/models/task.model';
import { ProjectStore } from '../../../projects/state/project.store';
import type { User } from '../../models/user.model';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, UserCard, EmptyState],
  styleUrl: './user-list.css',
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {
  private readonly userService = inject(UserService);
  private readonly projectService = inject(ProjectService);
  private readonly projectStore = inject(ProjectStore);

  readonly users = signal<User[]>([]);
  // Les deux vues partagent le même signal pour conserver leurs modifications.
  readonly projects = this.projectStore.projects;
  readonly searchTerm = signal('');
  readonly selectedUser = signal<User | null>(null);

  readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    return this.users().filter((user) =>
      [user.name, user.email, user.role].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  });

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });

    if (!this.projectStore.projectsLoaded) {
      this.projectService.getProjects().subscribe((projects) => {
        this.projects.set(projects);
        this.projectStore.projectsLoaded = true;
      });
    }
  }

  // Mise à jour immuable du projet et de la tâche, comme dans ProjectList.
  onTaskStatusChange(event: { projectId: number; taskId: number; status: TaskStatus }): void {
    this.projects.update(projects => projects.map(project =>
      project.id === event.projectId
        ? {
            ...project,
            tasks: project.tasks.map(task => task.id === event.taskId
              ? { ...task, status: event.status }
              : task),
          }
        : project
    ));
  }

  onSearchTermChange(value: string): void {
    this.searchTerm.set(value);
  }

  // La suppression met aussi à jour les compteurs et l'autre vue via le store partagé.
  onTaskDelete(event: { projectId: number; taskId: number }): void {
    this.projects.update(projects => projects.map(project =>
      project.id === event.projectId
        ? { ...project, tasks: project.tasks.filter(task => task.id !== event.taskId) }
        : project
    ));
  }

  onUserSelected(user: User): void {
    this.selectedUser.set(user);
    console.log('Utilisateur sélectionné :', user);
  }
}
