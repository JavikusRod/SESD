import EditExternalCell from 'src/components/Nomeclators/External/EditExternalCell'

type ExternalPageProps = {
  id: Int
}

const EditExternalPage = ({ id }: ExternalPageProps) => {
  return <EditExternalCell id={id} />
}

export default EditExternalPage
