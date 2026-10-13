import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render projects, nested tasks, and the empty task state', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('TaskFlow');
    expect(page.querySelectorAll('app-project-card').length).toBe(3);
    expect(page.textContent).toContain('Créer la page accueil');
    expect(page.textContent).toContain('Aucune tâche.');
  });

  it('should communicate a project selection from child to parent', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    page.querySelector<HTMLButtonElement>('app-project-card button')!.click();
    await fixture.whenStable();
    expect(page.querySelector('[aria-live="polite"]')?.textContent)
      .toContain('Projet sélectionné : Site e-commerce');
  });

  it('should filter by name and restore projects when the search is cleared', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const search = page.querySelector<HTMLInputElement>('#project-search')!;

    for (const [term, expectedName] of [
      ['portfolio', 'Portfolio'],
      ['  SITE  ', 'Site e-commerce'],
    ]) {
      search.value = term;
      search.dispatchEvent(new Event('input', { bubbles: true }));
      await fixture.whenStable();
      expect(page.querySelectorAll('app-project-card').length).toBe(1);
      expect(page.querySelector('app-project-card h3')?.textContent).toContain(expectedName);
    }

    search.value = 'xyz';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    expect(page.querySelectorAll('app-project-card').length).toBe(0);
    expect(page.textContent).toContain('Aucun projet ne correspond à votre recherche.');

    search.value = '';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
    expect(page.querySelectorAll('app-project-card').length).toBe(3);
  });});

