import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_INTERNAL_MUTATION = gql`
  mutation DeleteInternalMutation($id: Int!) {
    deleteInternal(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Internal = ({ internal }) => {
  const [deleteInternal] = useMutation(DELETE_INTERNAL_MUTATION, {
    onCompleted: () => {
      toast.success('Internal deleted')
      navigate(routes.nomeclatorsInternals())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete internal ' + id + '?')) {
      deleteInternal({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Internal {internal.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{internal.id}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(internal.createdAt)}</td>
            </tr><tr>
              <th>Name</th>
              <td>{internal.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.nomeclatorsEditInternal({ id: internal.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(internal.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Internal
