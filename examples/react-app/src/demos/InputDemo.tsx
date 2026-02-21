import { Input } from '@snx-ui/react'

export function InputDemo() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <Input placeholder="Email address" />
      <Input disabled placeholder="Disabled input" />
      <Input type="file" />
    </div>
  )
}
