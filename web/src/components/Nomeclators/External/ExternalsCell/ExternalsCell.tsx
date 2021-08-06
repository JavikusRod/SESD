import type { FindExternals } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Externals from 'src/components/Nomeclators/External/Externals'

export const QUERY = gql`
  query FindExternals {
    externals {
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
      {'No externals yet. '}
      <Link to={routes.nomeclatorsNewExternal()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ externals }: CellSuccessProps<FindExternals>) => {
  return <Externals externals={externals} />
}
