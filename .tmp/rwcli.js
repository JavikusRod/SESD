
  const proxyquire = require("proxyquire")
  const fs = require('fs')
  const path = require('path')
  const files = {}
  const fileOverrides = {"file:///d%3A/Projects/redwood.js/SESD/web/src/App.tsx":"import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'\nimport { RedwoodApolloProvider } from '@redwoodjs/web/apollo'\n\nimport FatalErrorPage from 'src/pages/FatalErrorPage'\nimport Routes from 'src/Routes'\n\nimport './index.css'\n\nimport { createTheme, ThemeProvider } from '@material-ui/core/styles'\nimport purple from '@material-ui/core/colors/purple'\nimport green from '@material-ui/core/colors/green'\n\nconst theme = createTheme({\n  palette: {\n    primary: {\n      main: purple[500],\n    },\n    secondary: {\n      main: green[500],\n    },\n  },\n})\n\nconst App = () => (\n  <ThemeProvider theme={theme}>\n    <FatalErrorBoundary page={FatalErrorPage}>\n      <RedwoodProvider>\n        <RedwoodApolloProvider>\n          <Routes />\n        </RedwoodApolloProvider>\n      </RedwoodProvider>\n    </FatalErrorBoundary>\n  </ThemeProvider>\n)\n\nexport default App\n","file:///d%3A/Projects/redwood.js/SESD/web/src/pages/NotFoundPage/NotFoundPage.tsx":"import Button from '@material-ui/core/Button'\n\nexport default () => (\n  <main>\n    <style\n      dangerouslySetInnerHTML={{\n        __html: `\n              html, body {\n                margin: 0;\n              }\n              html * {\n                box-sizing: border-box;\n              }\n              main {\n                display: flex;\n                align-items: center;\n                font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif;\n                text-align: center;\n                background-color: #E2E8F0;\n                height: 100vh;\n              }\n              section {\n                background-color: white;\n                border-radius: 0.25rem;\n                width: 32rem;\n                padding: 1rem;\n                margin: 0 auto;\n                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n              }\n              h1 {\n                font-size: 2rem;\n                margin: 0;\n                font-weight: 500;\n                line-height: 1;\n                color: #2D3748;\n              }\n            `,\n      }}\n    />\n    <section>\n      <h1>\n        <span>404 Page Not Found</span>\n      </h1>\n    </section>\n  </main>\n)\n"}
  const FILE_SCHEME = 'file://'

  function URL_file(f) {
    if (f.startsWith(FILE_SCHEME))
      f = f.substr(FILE_SCHEME.length)
    return new URL(FILE_SCHEME + path.normalize(f)).href
  }

  proxyquire('@redwoodjs/cli/dist', {
    fs: {
      mkdir() {},
      mkdirSync(...args) {},
      writeFile(a, b) {
        files[URL_file(a)] = b
      },
      writeFileSync(a, b) {
        files[URL_file(a)] = b
      },
      readFileSync(...args) {
        const f = URL_file(args[0])
        if (fileOverrides[f]) return fileOverrides[f]
        return fs.readFileSync.apply(fs, args)
      },
      '@global': true,
    },
  })

  process.on('exit', () => {
    console.log("---------===----===--------")
    console.log(JSON.stringify(files, null, 2))
  })
  