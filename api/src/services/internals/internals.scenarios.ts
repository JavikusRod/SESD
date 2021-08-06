import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.InternalCreateArgs>({
  internal: { one: { name: 'String' }, two: { name: 'String' } },
})

export type StandardScenario = typeof standard
