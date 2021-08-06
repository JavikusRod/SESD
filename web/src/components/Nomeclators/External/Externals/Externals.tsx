import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Nomeclators/External/ExternalsCell'

const DELETE_EXTERNAL_MUTATION = gql`
  mutation DeleteExternalMutation($id: Int!) {
    deleteExternal(id: $id) {
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

const ExternalsList = ({ externals }) => {
  const [deleteExternal] = useMutation(DELETE_EXTERNAL_MUTATION, {
    onCompleted: () => {
      toast.success('External deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete external ' + id + '?')) {
      deleteExternal({ variables: { id } })
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
          {externals.map((external) => (
            <tr key={external.id}>
              <td>{truncate(external.id)}</td>
              <td>{timeTag(external.createdAt)}</td>
              <td>{truncate(external.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.nomeclatorsExternal({ id: external.id })}
                    title={'Show external ' + external.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.nomeclatorsEditExternal({ id: external.id })}
                    title={'Edit external ' + external.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete external ' + external.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(external.id)}
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

export default ExternalsList
