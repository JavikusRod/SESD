import ExternalCell from 'src/components/Nomeclators/External/ExternalCell'

type ExternalPageProps = {
  id: Int
}

const ExternalPage = ({ id }: ExternalPageProps) => {
  return <ExternalCell id={id} />
}

export default ExternalPage
