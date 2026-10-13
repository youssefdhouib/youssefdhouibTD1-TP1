import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import type { Project } from '../../models/project.model';
import { ProjectStore } from '../../state/project.store';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-project-list',
  standalone: true,
  // FormsModule enables [(ngModel)] on the search input.
  imports: [ProjectCard, EmptyState, FormsModule],
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  // The service supplies data; the store holds shared application state.
  private readonly projectService = inject(ProjectService);
  private readonly projectStore = inject(ProjectStore);

  // ngModel reads and updates this signal when the user types.
  readonly searchTerm = signal('');
  readonly projects = this.projectStore.projects;
  readonly selectedProject = this.projectStore.selectedProject;

  // Recalculates automatically when the search text or project list changes.
  readonly filteredProjects = computed(() => {
    // Ignore surrounding spaces and differences in letter case.
    const term = this.searchTerm().trim().toLowerCase();

    // Every name includes an empty string, so clearing the search shows all projects.
    return this.projects().filter(project =>
      project.name.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    // Subscribe explicitly as required by the TP, then update the store's signal.
    // of(PROJECTS) emits once and completes immediately.
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }

  // Receives the ProjectCard output event and records the selected project.
  onProjectSelected(project: Project): void {
    this.projectStore.selectProject(project);
    console.log(project);
  }
}
