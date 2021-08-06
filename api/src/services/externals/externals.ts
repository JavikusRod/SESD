import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const externals = () => {
  return db.external.findMany()
}

export const external = ({ id }: Prisma.ExternalWhereUniqueInput) => {
  return db.external.findUnique({
    where: { id },
  })
}

interface CreateExternalArgs {
  input: Prisma.ExternalCreateInput
}

export const createExternal = ({ input }: CreateExternalArgs) => {
  return db.external.create({
    data: input,
  })
}

interface UpdateExternalArgs extends Prisma.ExternalWhereUniqueInput {
  input: Prisma.ExternalUpdateInput
}

export const updateExternal = ({ id, input }: UpdateExternalArgs) => {
  return db.external.update({
    data: input,
    where: { id },
  })
}

export const deleteExternal = ({ id }: Prisma.ExternalWhereUniqueInput) => {
  return db.external.delete({
    where: { id },
  })
}

export const External = {
  inputDocuments: (_obj, { root }: ResolverArgs<ReturnType<typeof external>>) =>
    db.external.findUnique({ where: { id: root.id } }).inputDocuments(),
  outputDocuments: (
    _obj,
    { root }: ResolverArgs<ReturnType<typeof external>>
  ) => db.external.findUnique({ where: { id: root.id } }).outputDocuments(),
}
