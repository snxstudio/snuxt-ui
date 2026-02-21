import { Component, input, computed } from '@angular/core'

@Component({
  selector: 'snx-alert',
  standalone: true,
  template: `<div [class]="classes()" role="alert"><ng-content /></div>`,
})
export class SnxAlertComponent {
  variant = input<'default' | 'destructive' | 'success' | 'warning'>('default')
  classes = computed(() => `snx-alert snx-alert-${this.variant()}`)
}

@Component({
  selector: 'snx-alert-title',
  standalone: true,
  template: `<h5 class="snx-alert-title"><ng-content /></h5>`,
})
export class SnxAlertTitleComponent {}

@Component({
  selector: 'snx-alert-description',
  standalone: true,
  template: `<div class="snx-alert-description"><ng-content /></div>`,
})
export class SnxAlertDescriptionComponent {}
