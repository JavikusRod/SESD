// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import ExternalsLayout from 'src/layouts/Nomeclators/ExternalsLayout'

const Routes = () => {
  return (
    <>
      <Router>
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
