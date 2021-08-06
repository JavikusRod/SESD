import InternalCell from 'src/components/Nomeclators/Internal/InternalCell'

type InternalPageProps = {
  id: Int
}

const InternalPage = ({ id }: InternalPageProps) => {
  return <InternalCell id={id} />
}

export default InternalPage
