import { Injectable, signal } from '@angular/core';
import type { Project } from '../models/project.model';

// A root-provided store shares the same state instance across the application.
@Injectable({ providedIn: 'root' })
export class ProjectStore {
  // Signals notify their consumers when set() or update() changes their value.
  readonly projects = signal<Project[]>([]);
  readonly selectedProject = signal<Project | null>(null);

  // Keep the selected project in shared state after a child emits its selection.
  selectProject(project: Project): void {
    this.selectedProject.set(project);
  }
}

