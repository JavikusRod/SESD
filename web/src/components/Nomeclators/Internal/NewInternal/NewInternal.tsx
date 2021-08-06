import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import InternalForm from 'src/components/Nomeclators/Internal/InternalForm'

const CREATE_INTERNAL_MUTATION = gql`
  mutation CreateInternalMutation($input: CreateInternalInput!) {
    createInternal(input: $input) {
      id
    }
  }
`

const NewInternal = () => {
  const [createInternal, { loading, error }] = useMutation(CREATE_INTERNAL_MUTATION, {
    onCompleted: () => {
      toast.success('Internal created')
      navigate(routes.nomeclatorsInternals())
    },
  })

  const onSave = (input) => {
    createInternal({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Internal</h2>
      </header>
      <div className="rw-segment-main">
        <InternalForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewInternal
