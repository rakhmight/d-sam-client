import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from 'react-redux'
import { store } from './store'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
)