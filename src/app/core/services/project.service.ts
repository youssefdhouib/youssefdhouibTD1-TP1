import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError, defer, finalize, of, shareReplay, tap } from 'rxjs';
import type { Project } from '../../features/projects/models/project.model';
import { ProjectStore } from '../../features/projects/state/project.store';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  // Une seule instance de ce service est partagée dans l'injecteur racine.
  readonly id = Math.random().toString(36).slice(2, 10);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private readonly http = inject(HttpClient);
  private readonly store = inject(ProjectStore);
  readonly projects = this.store.projects;
  private readonly url = 'http://localhost:3000/projects';
  private request$?: Observable<Project[]>;

  constructor() {
    console.log('[ProjectService] instance créée :', this.id);
  }

  getProjects(): Observable<Project[]> {
    // Réutilise les données chargées et partage une requête HTTP en cours.
    if (this.store.projectsLoaded) return of(this.projects());
    return this.request$ ??= defer(() => {
      this.loading.set(true);
      this.error.set(null);
      return this.http.get<Project[]>(this.url);
    }).pipe(
      tap(projects => {
        this.projects.set(projects);
        this.store.projectsLoaded = true;
      }),
      catchError(() => {
        this.error.set("Impossible de charger les projets. Vérifiez que l'API est démarrée.");
        return EMPTY;
      }),
      finalize(() => {
        this.loading.set(false);
        this.request$ = undefined;
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
  }

  deleteProject(id: number): Observable<unknown> {
    return defer(() => {
      this.loading.set(true);
      this.error.set(null);
      return this.http.delete(`${this.url}/${id}`);
    }).pipe(
      // Le signal partagé actualise les deux vues sans synchronisation manuelle.
      tap(() => {
        this.projects.update(projects => projects.filter(project => project.id !== id));
        if (this.store.selectedProject()?.id === id) this.store.selectedProject.set(null);
      }),
      catchError(() => {
        this.error.set('Impossible de supprimer le projet.');
        return EMPTY;
      }),
      finalize(() => this.loading.set(false)),
    );
  }
}

