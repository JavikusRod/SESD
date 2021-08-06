import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Nomeclators/Internal/InternalsCell'

const DELETE_INTERNAL_MUTATION = gql`
  mutation DeleteInternalMutation($id: Int!) {
    deleteInternal(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const InternalsList = ({ internals }) => {
  const [deleteInternal] = useMutation(DELETE_INTERNAL_MUTATION, {
    onCompleted: () => {
      toast.success('Internal deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete internal ' + id + '?')) {
      deleteInternal({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {internals.map((internal) => (
            <tr key={internal.id}>
              <td>{truncate(internal.id)}</td>
              <td>{timeTag(internal.createdAt)}</td>
              <td>{truncate(internal.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.nomeclatorsInternal({ id: internal.id })}
                    title={'Show internal ' + internal.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.nomeclatorsEditInternal({ id: internal.id })}
                    title={'Edit internal ' + internal.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete internal ' + internal.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(internal.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InternalsList
