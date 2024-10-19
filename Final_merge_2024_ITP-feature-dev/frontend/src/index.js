import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
// import { store } from "../src/component/Transport/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/inventry/redux/store";
import StoreContextProvider from "../src/food/Context/StoreContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <StoreContextProvider>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Provider>
      </PersistGate>
    </StoreContextProvider>
  </BrowserRouter>
);

reportWebVitals();
