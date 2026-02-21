import { Component, input, computed } from '@angular/core'

@Component({
  selector: 'snx-card',
  standalone: true,
  template: `<div [class]="classes()"><ng-content /></div>`,
})
export class SnxCardComponent {
  class = input('')
  classes = computed(() => ['snx-card', this.class()].filter(Boolean).join(' '))
}

@Component({
  selector: 'snx-card-header',
  standalone: true,
  template: `<div class="snx-card-header"><ng-content /></div>`,
})
export class SnxCardHeaderComponent {}

@Component({
  selector: 'snx-card-title',
  standalone: true,
  template: `<h3 class="snx-card-title"><ng-content /></h3>`,
})
export class SnxCardTitleComponent {}

@Component({
  selector: 'snx-card-description',
  standalone: true,
  template: `<p class="snx-card-description"><ng-content /></p>`,
})
export class SnxCardDescriptionComponent {}

@Component({
  selector: 'snx-card-content',
  standalone: true,
  template: `<div class="snx-card-content"><ng-content /></div>`,
})
export class SnxCardContentComponent {}

@Component({
  selector: 'snx-card-footer',
  standalone: true,
  template: `<div class="snx-card-footer"><ng-content /></div>`,
})
export class SnxCardFooterComponent {}
