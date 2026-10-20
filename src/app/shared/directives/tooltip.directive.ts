import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2, inject } from '@angular/core';

@Directive({ selector: '[appTooltip]', standalone: true })
export class TooltipDirective implements OnDestroy {
  @Input() appTooltip = '';
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private bubble?: HTMLElement;

  @HostListener('mouseenter')
  show(): void {
    if (!this.appTooltip || this.bubble) {
      return;
    }
    const bubble = this.renderer.createElement('span') as HTMLElement;
    this.bubble = bubble;
    this.renderer.setAttribute(bubble, 'role', 'tooltip');
    this.renderer.setAttribute(bubble, 'class', 'fixed z-50 rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-lg');
    // Un nœud texte affiche la description sans interpréter du HTML.
    this.renderer.appendChild(bubble, this.renderer.createText(this.appTooltip));
    const bounds = this.element.nativeElement.getBoundingClientRect();
    const viewportWidth = this.document.documentElement.clientWidth;
    const width = Math.max(0, Math.min(320, viewportWidth - 16));
    this.renderer.setStyle(bubble, 'max-width', `${width}px`);
    this.renderer.setStyle(bubble, 'left', `${Math.max(8, Math.min(bounds.left, viewportWidth - width - 8))}px`);
    this.renderer.setStyle(bubble, 'top', `${bounds.bottom + 6}px`);
    this.renderer.setStyle(bubble, 'pointer-events', 'none');
    // Le body évite que les cartes overflow-hidden coupent l'infobulle.
    this.renderer.appendChild(this.document.body, bubble);
  }

  @HostListener('mouseleave')
  hide(): void {
    if (this.bubble) {
      this.renderer.removeChild(this.document.body, this.bubble);
      this.bubble = undefined;
    }
  }

  ngOnDestroy(): void {
    // Nettoie aussi la bulle quand une recherche retire la tâche de la page.
    this.hide();
  }
}
