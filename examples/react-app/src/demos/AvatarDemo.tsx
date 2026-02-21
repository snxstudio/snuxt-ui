import { Avatar } from '@snx-ui/react'

export function AvatarDemo() {
  return (
    <div className="flex gap-3 items-center">
      <Avatar fallback="SN" />
      <Avatar fallback="UI" />
      <Avatar fallback="?" />
    </div>
  )
}
