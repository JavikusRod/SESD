import type { EditExternalById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import ExternalForm from 'src/components/Nomeclators/External/ExternalForm'

export const QUERY = gql`
  query EditExternalById($id: Int!) {
    external: external(id: $id) {
      id
      createdAt
      name
    }
  }
`
const UPDATE_EXTERNAL_MUTATION = gql`
  mutation UpdateExternalMutation($id: Int!, $input: UpdateExternalInput!) {
    updateExternal(id: $id, input: $input) {
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

export const Success = ({ external }: CellSuccessProps<EditExternalById>) => {
  const [updateExternal, { loading, error }] = useMutation(
    UPDATE_EXTERNAL_MUTATION,
    {
      onCompleted: () => {
        toast.success('External updated')
        navigate(routes.nomeclatorsExternals())
      },
    }
  )

  const onSave = (input, id) => {
    updateExternal({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit External {external.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ExternalForm
          external={external}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
