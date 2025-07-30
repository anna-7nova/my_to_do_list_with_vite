import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/App'
import { Provider } from 'react-redux'
import { store } from './app/store'
// import { AppHttpRequests } from './app/AppHttpRequests'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />  
    {/* <AppHttpRequests /> */}
  </Provider>,
)
