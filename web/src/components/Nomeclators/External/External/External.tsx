import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_EXTERNAL_MUTATION = gql`
  mutation DeleteExternalMutation($id: Int!) {
    deleteExternal(id: $id) {
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

const External = ({ external }) => {
  const [deleteExternal] = useMutation(DELETE_EXTERNAL_MUTATION, {
    onCompleted: () => {
      toast.success('External deleted')
      navigate(routes.nomeclatorsExternals())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete external ' + id + '?')) {
      deleteExternal({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            External {external.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{external.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(external.createdAt)}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{external.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.nomeclatorsEditExternal({ id: external.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(external.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default External
