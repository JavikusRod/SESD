// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import InternalsLayout from 'src/layouts/Nomeclators/InternalsLayout'
import ExternalsLayout from 'src/layouts/Nomeclators/ExternalsLayout'

const Routes = () => {
  return (
    <>
      <Router>
        <Set wrap={InternalsLayout}>
          <Route path="/nomeclators/internals/new" page={NomeclatorsInternalNewInternalPage} name="nomeclatorsNewInternal" />
          <Route path="/nomeclators/internals/{id:Int}/edit" page={NomeclatorsInternalEditInternalPage} name="nomeclatorsEditInternal" />
          <Route path="/nomeclators/internals/{id:Int}" page={NomeclatorsInternalInternalPage} name="nomeclatorsInternal" />
          <Route path="/nomeclators/internals" page={NomeclatorsInternalInternalsPage} name="nomeclatorsInternals" />
        </Set>
        <Set wrap={ExternalsLayout}>
          <Route path="/nomeclators/externals/new" page={NomeclatorsExternalNewExternalPage} name="nomeclatorsNewExternal" />
          <Route path="/nomeclators/externals/{id:Int}/edit" page={NomeclatorsExternalEditExternalPage} name="nomeclatorsEditExternal" />
          <Route path="/nomeclators/externals/{id:Int}" page={NomeclatorsExternalExternalPage} name="nomeclatorsExternal" />
          <Route path="/nomeclators/externals" page={NomeclatorsExternalExternalsPage} name="nomeclatorsExternals" />
        </Set>
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Router>
    </>
  )
}

export default Routes
