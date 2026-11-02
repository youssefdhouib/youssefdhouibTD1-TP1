import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError, defer, finalize, of, shareReplay, tap } from 'rxjs';
import type { User } from '../../features/users/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly id = Math.random().toString(36).slice(2, 10);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/users';
  private readonly users = signal<User[]>([]);
  private loaded = false;
  private request$?: Observable<User[]>;

  constructor() {
    console.log('[UserService] instance créée :', this.id);
  }

  getUsers(): Observable<User[]> {
    if (this.loaded) return of(this.users());
    // Toutes les listes de tâches réutilisent la même requête et le même cache.
    return this.request$ ??= defer(() => {
      this.loading.set(true);
      this.error.set(null);
      return this.http.get<User[]>(this.url);
    }).pipe(
      tap(users => {
        this.users.set(users);
        this.loaded = true;
      }),
      catchError(() => {
        this.error.set("Impossible de charger les utilisateurs. Vérifiez que l'API est démarrée.");
        return EMPTY;
      }),
      finalize(() => {
        this.loading.set(false);
        this.request$ = undefined;
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
  }

  getUserById(id: number): Observable<User | undefined> {
    return defer(() => {
      this.loading.set(true);
      this.error.set(null);
      return this.http.get<User>(`${this.url}/${id}`);
    }).pipe(
      catchError(() => {
        this.error.set('Utilisateur introuvable ou API inaccessible.');
        return of(undefined);
      }),
      finalize(() => this.loading.set(false)),
    );
  }
}
