import { Component, input, computed } from '@angular/core'

type ChatBubbleVariant = 'user' | 'ai'

@Component({
  selector: 'snx-chat-bubble',
  standalone: true,
  template: `<div [class]="classes()"><ng-content /></div>`,
})
export class SnxChatBubbleComponent {
  variant = input<ChatBubbleVariant>('ai')
  class = input('')
  classes = computed(() =>
    ['snx-chat-bubble', `snx-chat-bubble-${this.variant()}`, this.class()].filter(Boolean).join(' ')
  )
}

@Component({
  selector: 'snx-chat-bubble-avatar',
  standalone: true,
  template: `<img class="snx-chat-bubble-avatar" [src]="src()" [alt]="alt()" />`,
})
export class SnxChatBubbleAvatarComponent {
  src = input.required<string>()
  alt = input('')
}

@Component({
  selector: 'snx-chat-bubble-content',
  standalone: true,
  template: `<div class="snx-chat-bubble-content"><ng-content /></div>`,
})
export class SnxChatBubbleContentComponent {}

@Component({
  selector: 'snx-chat-bubble-timestamp',
  standalone: true,
  template: `<span class="snx-chat-bubble-timestamp"><ng-content /></span>`,
})
export class SnxChatBubbleTimestampComponent {}

@Component({
  selector: 'snx-chat-bubble-typing',
  standalone: true,
  template: `
    <div class="snx-chat-bubble-typing">
      <span class="snx-chat-bubble-typing-dot"></span>
      <span class="snx-chat-bubble-typing-dot"></span>
      <span class="snx-chat-bubble-typing-dot"></span>
    </div>
  `,
})
export class SnxChatBubbleTypingComponent {}
