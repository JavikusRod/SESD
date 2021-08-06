import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const internals = () => {
  return db.internal.findMany()
}

export const internal = ({ id }: Prisma.InternalWhereUniqueInput) => {
  return db.internal.findUnique({
    where: { id },
  })
}

interface CreateInternalArgs {
  input: Prisma.InternalCreateInput
}

export const createInternal = ({ input }: CreateInternalArgs) => {
  return db.internal.create({
    data: input,
  })
}

interface UpdateInternalArgs extends Prisma.InternalWhereUniqueInput {
  input: Prisma.InternalUpdateInput
}

export const updateInternal = ({ id, input }: UpdateInternalArgs) => {
  return db.internal.update({
    data: input,
    where: { id },
  })
}

export const deleteInternal = ({ id }: Prisma.InternalWhereUniqueInput) => {
  return db.internal.delete({
    where: { id },
  })
}

export const Internal = {
  inputDocuments: (_obj, { root }: ResolverArgs<ReturnType<typeof internal>>) =>
    db.internal.findUnique({ where: { id: root.id } }).inputDocuments(),
  outputDocuments: (
    _obj,
    { root }: ResolverArgs<ReturnType<typeof internal>>
  ) => db.internal.findUnique({ where: { id: root.id } }).outputDocuments(),
}
