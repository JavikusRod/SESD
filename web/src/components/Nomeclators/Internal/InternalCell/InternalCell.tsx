import type { FindInternalById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Internal from 'src/components/Nomeclators/Internal/Internal'

export const QUERY = gql`
  query FindInternalById($id: Int!) {
    internal: internal(id: $id) {
      id
      createdAt
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Internal not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ internal }: CellSuccessProps<FindInternalById>) => {
  return <Internal internal={internal} />
}
