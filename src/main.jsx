import React from 'react'
import ReactDOM from 'react-dom/client'

// import Chapter1 from './chapter-1/Chapter1'
// import Chapter2 from './chapter-2/Chapter2'
// import Chapter3 from './chapter-3/Chapter3'
// import Chapter4 from './chapter-4/Chapter4'
import Dashboard from "./dashboard/Dashboard"

import './index.css'

// Note that with strict mode enabled in React 18 the useEffect hook runs twice in development.
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Dashboard />
  // </React.StrictMode>
)
