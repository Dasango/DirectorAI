import { Component, HostListener, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ButtonDirective } from '../../shared/components/ui/button/button.component';
import { AnimatedGroupDirective } from '../../shared/components/ui/animated-group/animated-group.component';
import { LogoComponent } from './logo.component';
import { ArrowRightIconComponent } from './icons.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, ButtonDirective, AnimatedGroupDirective, LogoComponent, ArrowRightIconComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  protected menuState = signal(false);
  protected isScrolled = signal(false);

  readonly menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Solution', href: '#solution' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ];

  readonly customers = [
    { src: 'https://html.tailus.io/blocks/customers/nvidia.svg', alt: 'Nvidia Logo', height: 'h-5' },
    { src: 'https://html.tailus.io/blocks/customers/column.svg', alt: 'Column Logo', height: 'h-4' },
    { src: 'https://html.tailus.io/blocks/customers/github.svg', alt: 'GitHub Logo', height: 'h-4' },
    { src: 'https://html.tailus.io/blocks/customers/nike.svg', alt: 'Nike Logo', height: 'h-5' },
    { src: 'https://html.tailus.io/blocks/customers/lemonsqueezy.svg', alt: 'Lemon Squeezy Logo', height: 'h-5' },
    { src: 'https://html.tailus.io/blocks/customers/laravel.svg', alt: 'Laravel Logo', height: 'h-4' },
    { src: 'https://html.tailus.io/blocks/customers/lilly.svg', alt: 'Lilly Logo', height: 'h-7' },
    { src: 'https://html.tailus.io/blocks/customers/openai.svg', alt: 'OpenAI Logo', height: 'h-6' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.menuState.update(v => !v);
  }
}
