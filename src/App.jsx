import React from 'react'

import { GlobalProvider } from 'contexts'
import Entry from 'pages/Entry'

const App = () => {
  return (
    <React.StrictMode>
      <GlobalProvider>
        <Entry />
      </GlobalProvider>
    </React.StrictMode>
  )
}

export default App
