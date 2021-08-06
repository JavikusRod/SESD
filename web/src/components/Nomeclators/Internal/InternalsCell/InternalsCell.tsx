import type { FindInternals } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Internals from 'src/components/Nomeclators/Internal/Internals'

export const QUERY = gql`
  query FindInternals {
    internals {
      id
      createdAt
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No internals yet. '}
      <Link
        to={routes.nomeclatorsNewInternal()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ internals }: CellSuccessProps<FindInternals>) => {
  return <Internals internals={internals} />
}
