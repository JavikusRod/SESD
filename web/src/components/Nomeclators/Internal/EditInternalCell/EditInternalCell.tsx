import type { EditInternalById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import InternalForm from 'src/components/Nomeclators/Internal/InternalForm'

export const QUERY = gql`
  query EditInternalById($id: Int!) {
    internal: internal(id: $id) {
      id
      createdAt
      name
    }
  }
`
const UPDATE_INTERNAL_MUTATION = gql`
  mutation UpdateInternalMutation($id: Int!, $input: UpdateInternalInput!) {
    updateInternal(id: $id, input: $input) {
      id
      createdAt
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ internal }: CellSuccessProps<EditInternalById>) => {
  const [updateInternal, { loading, error }] = useMutation(UPDATE_INTERNAL_MUTATION, {
    onCompleted: () => {
      toast.success('Internal updated')
      navigate(routes.nomeclatorsInternals())
    },
  })

  const onSave = (input, id) => {
    updateInternal({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Internal {internal.id}</h2>
      </header>
      <div className="rw-segment-main">
        <InternalForm internal={internal} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
