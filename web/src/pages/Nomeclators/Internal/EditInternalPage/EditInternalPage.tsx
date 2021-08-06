import EditInternalCell from 'src/components/Nomeclators/Internal/EditInternalCell'

type InternalPageProps = {
  id: Int
}

const EditInternalPage = ({ id }: InternalPageProps) => {
  return <EditInternalCell id={id} />
}

export default EditInternalPage
