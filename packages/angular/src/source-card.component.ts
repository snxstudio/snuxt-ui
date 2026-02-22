import { Component, input } from '@angular/core'

@Component({
  selector: 'snx-source-cards',
  standalone: true,
  template: `<div class="snx-source-cards"><ng-content /></div>`,
})
export class SnxSourceCardsComponent {}

@Component({
  selector: 'snx-source-card',
  standalone: true,
  template: `
    <a [href]="href()" class="snx-source-card" target="_blank" rel="noopener noreferrer">
      @if (favicon()) {
        <img class="snx-source-card-favicon" [src]="favicon()" [alt]="domain()" />
      }
      <div class="snx-source-card-body">
        <p class="snx-source-card-title">{{ title() }}</p>
        <p class="snx-source-card-domain">{{ domain() }}</p>
      </div>
      @if (index()) {
        <span class="snx-source-card-index">{{ index() }}</span>
      }
    </a>
  `,
})
export class SnxSourceCardComponent {
  href = input.required<string>()
  favicon = input('')
  title = input('')
  domain = input('')
  index = input<number | undefined>(undefined)
}
