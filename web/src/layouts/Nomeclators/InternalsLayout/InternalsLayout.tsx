import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import IconButton from '@material-ui/core/IconButton'
import { ArrowBack } from '@material-ui/icons'

type InternalLayoutProps = {
  children: React.ReactNode
}

const InternalsLayout = ({ children }: InternalLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <IconButton aria-label="back" component={Link} to={routes.home()}>
          <ArrowBack fontSize="inherit" />
        </IconButton>
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.nomeclatorsInternals()} className="rw-link">
            Internals
          </Link>
        </h1>
        <Link
          to={routes.nomeclatorsNewInternal()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Internal
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default InternalsLayout
