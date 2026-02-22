import { useState } from 'react';
import { Switch } from '@snuxt-ui/react';

export function SwitchDemo() {
  const [on, setOn] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Switch checked={on} onCheckedChange={setOn} />
      <span className="text-sm">{on ? 'On' : 'Off'}</span>
    </div>
  );
}
