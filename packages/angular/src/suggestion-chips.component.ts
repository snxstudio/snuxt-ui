import { Component, input, computed } from '@angular/core'

type SuggestionChipVariant = 'default' | 'primary' | 'outline'

@Component({
  selector: 'snx-suggestion-chips',
  standalone: true,
  template: `<div class="snx-suggestion-chips"><ng-content /></div>`,
})
export class SnxSuggestionChipsComponent {}

@Component({
  selector: 'snx-suggestion-chip',
  standalone: true,
  template: `<button [class]="classes()" type="button"><ng-content /></button>`,
})
export class SnxSuggestionChipComponent {
  variant = input<SuggestionChipVariant>('default')
  class = input('')
  classes = computed(() =>
    ['snx-suggestion-chip', `snx-suggestion-chip-${this.variant()}`, this.class()].filter(Boolean).join(' ')
  )
}
