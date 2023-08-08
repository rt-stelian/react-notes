import React from "react"
import { Provider } from "react-redux"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import store from "./store/index"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
