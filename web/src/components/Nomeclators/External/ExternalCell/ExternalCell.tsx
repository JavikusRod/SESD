import type { FindExternalById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import External from 'src/components/Nomeclators/External/External'

export const QUERY = gql`
  query FindExternalById($id: Int!) {
    external: external(id: $id) {
      id
      createdAt
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>External not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ external }: CellSuccessProps<FindExternalById>) => {
  return <External external={external} />
}
