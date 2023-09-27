import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/styles/reset.less'

function App() {
  return <div>hello React + Webpack</div>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
