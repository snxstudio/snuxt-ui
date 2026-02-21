import { Component, computed, input } from '@angular/core'

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive'

@Component({
  selector: 'snx-badge',
  standalone: true,
  template: `<span [class]="classes()"><ng-content /></span>`,
})
export class SnxBadgeComponent {
  variant = input<BadgeVariant>('default')
  class = input('')

  classes = computed(() =>
    ['snx-badge', `snx-badge-${this.variant()}`, this.class()].filter(Boolean).join(' ')
  )
}
