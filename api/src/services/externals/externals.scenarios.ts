import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ExternalCreateArgs>({
  external: { one: { name: 'String' }, two: { name: 'String' } },
})

export type StandardScenario = typeof standard
