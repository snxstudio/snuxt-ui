import { Tooltip, Button } from '@snx-ui/react';

export function TooltipDemo() {
  return (
    <div className="flex items-center gap-3">
      <Tooltip content="Save your changes">
        <Button variant="outline">Hover me</Button>
      </Tooltip>
      <Tooltip content="Delete this item">
        <Button variant="outline">Or me</Button>
      </Tooltip>
    </div>
  );
}
