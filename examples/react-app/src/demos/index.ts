import { ButtonDemo } from './ButtonDemo'
import { BadgeDemo } from './BadgeDemo'
import { CardDemo } from './CardDemo'
import { InputDemo } from './InputDemo'
import { TextareaDemo } from './TextareaDemo'
import { AvatarDemo } from './AvatarDemo'
import { SeparatorDemo } from './SeparatorDemo'
import { SkeletonDemo } from './SkeletonDemo'
import { DialogDemo } from './DialogDemo'
import { TabsDemo } from './TabsDemo'
import { AccordionDemo } from './AccordionDemo'
import { SelectDemo } from './SelectDemo'
import { TooltipDemo } from './TooltipDemo'
import { PopoverDemo } from './PopoverDemo'
import { ToastDemo } from './ToastDemo'
import { DrawerDemo } from './DrawerDemo'
import { DropdownMenuDemo } from './DropdownMenuDemo'
import { SwitchDemo } from './SwitchDemo'
import { ProgressDemo } from './ProgressDemo'
import { LoaderDemo } from './LoaderDemo'
import { ChipsDemo } from './ChipsDemo'
import { PasswordInputDemo } from './PasswordInputDemo'
import { CounterDemo } from './CounterDemo'
import { AlertDemo } from './AlertDemo'

export type ComponentCategory = 'Form' | 'Display' | 'Overlay' | 'Navigation' | 'Feedback'

export interface DemoMeta {
  name: string
  category: ComponentCategory
  type: 'css-only' | 'interactive'
  component: React.ComponentType
}

export const demos: DemoMeta[] = [
  // Form (7)
  { name: 'Button', category: 'Form', type: 'css-only', component: ButtonDemo },
  { name: 'Input', category: 'Form', type: 'css-only', component: InputDemo },
  { name: 'Textarea', category: 'Form', type: 'css-only', component: TextareaDemo },
  { name: 'PasswordInput', category: 'Form', type: 'interactive', component: PasswordInputDemo },
  { name: 'Select', category: 'Form', type: 'interactive', component: SelectDemo },
  { name: 'Switch', category: 'Form', type: 'interactive', component: SwitchDemo },
  { name: 'Counter', category: 'Form', type: 'interactive', component: CounterDemo },
  // Display (7)
  { name: 'Badge', category: 'Display', type: 'css-only', component: BadgeDemo },
  { name: 'Card', category: 'Display', type: 'css-only', component: CardDemo },
  { name: 'Avatar', category: 'Display', type: 'css-only', component: AvatarDemo },
  { name: 'Separator', category: 'Display', type: 'css-only', component: SeparatorDemo },
  { name: 'Skeleton', category: 'Display', type: 'css-only', component: SkeletonDemo },
  { name: 'Progress', category: 'Display', type: 'css-only', component: ProgressDemo },
  { name: 'Loader', category: 'Display', type: 'css-only', component: LoaderDemo },
  // Overlay (5)
  { name: 'Dialog', category: 'Overlay', type: 'interactive', component: DialogDemo },
  { name: 'Tooltip', category: 'Overlay', type: 'interactive', component: TooltipDemo },
  { name: 'Popover', category: 'Overlay', type: 'interactive', component: PopoverDemo },
  { name: 'Toast', category: 'Overlay', type: 'interactive', component: ToastDemo },
  { name: 'Drawer', category: 'Overlay', type: 'interactive', component: DrawerDemo },
  // Navigation (3)
  { name: 'Tabs', category: 'Navigation', type: 'interactive', component: TabsDemo },
  { name: 'Accordion', category: 'Navigation', type: 'interactive', component: AccordionDemo },
  { name: 'DropdownMenu', category: 'Navigation', type: 'interactive', component: DropdownMenuDemo },
  // Feedback (2)
  { name: 'Alert', category: 'Feedback', type: 'css-only', component: AlertDemo },
  { name: 'Chips', category: 'Feedback', type: 'interactive', component: ChipsDemo },
]

export const categories = ['All', 'Form', 'Display', 'Overlay', 'Navigation', 'Feedback'] as const

export function getDemosByCategory(category: string): DemoMeta[] {
  if (category === 'All') return demos
  return demos.filter(d => d.category === category)
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: demos.length }
  for (const demo of demos) {
    counts[demo.category] = (counts[demo.category] || 0) + 1
  }
  return counts
}
