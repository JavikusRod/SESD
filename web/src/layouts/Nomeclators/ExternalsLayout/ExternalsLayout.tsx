import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import IconButton from '@material-ui/core/IconButton'
import { ArrowBack } from '@material-ui/icons'

type ExternalLayoutProps = {
  children: React.ReactNode
}

const ExternalsLayout = ({ children }: ExternalLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <IconButton aria-label="back" component={Link} to={routes.home()}>
          <ArrowBack fontSize="inherit" />
        </IconButton>
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.nomeclatorsExternals()} className="rw-link">
            Externals
          </Link>
        </h1>
        <Link
          to={routes.nomeclatorsNewExternal()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New External
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ExternalsLayout
