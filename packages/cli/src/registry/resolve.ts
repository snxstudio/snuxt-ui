import registryData from './registry.json' with { type: 'json' }

export interface ComponentEntry {
  name: string
  type: 'css-only' | 'interactive'
  files: {
    css?: string
    core?: string
    react?: string | string[]
    angular?: string | string[]
  }
  dependencies: {
    internal: string[]
    npm: Record<string, string[]>
  }
}

export interface Registry {
  components: Record<string, ComponentEntry>
}

export const registry = registryData as unknown as Registry

export function resolveComponentDeps(name: string, resolved = new Set<string>()): string[] {
  const component = registry.components[name]
  if (!component) return []

  for (const dep of component.dependencies.internal) {
    if (!resolved.has(dep)) {
      resolved.add(dep)
      resolveComponentDeps(dep, resolved)
    }
  }

  return Array.from(resolved)
}

export function getComponent(name: string): ComponentEntry | undefined {
  return registry.components[name]
}

export function listComponents(): string[] {
  return Object.keys(registry.components)
}
