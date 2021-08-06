import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import ExternalForm from 'src/components/Nomeclators/External/ExternalForm'

const CREATE_EXTERNAL_MUTATION = gql`
  mutation CreateExternalMutation($input: CreateExternalInput!) {
    createExternal(input: $input) {
      id
    }
  }
`

const NewExternal = () => {
  const [createExternal, { loading, error }] = useMutation(
    CREATE_EXTERNAL_MUTATION,
    {
      onCompleted: () => {
        toast.success('External created')
        navigate(routes.nomeclatorsExternals())
      },
    }
  )

  const onSave = (input) => {
    createExternal({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New External</h2>
      </header>
      <div className="rw-segment-main">
        <ExternalForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewExternal
