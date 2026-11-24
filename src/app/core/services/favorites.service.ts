import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  // État partagé entre les cartes et l'en-tête, conservé en mémoire.
  private readonly favoriteIds = signal<number[]>([]);
  readonly count = computed(() => this.favoriteIds().length);

  isFavorite(id: number): boolean {
    return this.favoriteIds().includes(id);
  }

  toggle(id: number): void {
    // Une nouvelle liste déclenche l'actualisation de l'étoile et du compteur.
    this.favoriteIds.update(ids => ids.includes(id)
      ? ids.filter(favoriteId => favoriteId !== id)
      : [...ids, id]);
  }
}
