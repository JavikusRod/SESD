import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'

import MUIDataTable from 'mui-datatables'

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
    console.log('Delete', id)
    if (confirm('Are you sure you want to delete internal ' + id + '?')) {
      deleteInternal({ variables: { id } })
    }
  }

  const table = {
    columns: [
      { name: 'id', label: 'ID', options: { display: false } },
      {
        name: 'no',
        label: 'No',
        options: {
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return <>{tableMeta.rowIndex + 1}</>
          },
        },
      },
      { name: 'name', label: 'Nombre', options: { sort: false } },
      { name: 'createdAt', label: 'Creado', options: { sort: false } },
      {
        name: 'acciones',
        label: 'Acciones',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <IconButton
                  aria-label="show"
                  component={Link}
                  to={routes.nomeclatorsInternal({ id: tableMeta.rowData[0] })}
                >
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  component={Link}
                  to={routes.nomeclatorsEditInternal({
                    id: tableMeta.rowData[0],
                  })}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteClick(tableMeta.rowData[0])}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </>
            )
          },
        },
      },
    ],
    data: internals,
    options: {
      rowsPerPage: 10,
      download: false,
      print: false,
      viewColumns: false,
      filter: false,
      selectableRows: 'none',
      responsive: 'standard',
    },
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <MUIDataTable
        data={table.data}
        columns={table.columns}
        options={table.options}
      />
    </div>
  )
}

export default InternalsList
