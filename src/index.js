import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import reduxStore, { persistor } from "./config/redux";
import * as serviceWorker from "./config/serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reduxStore}>
    <App persistor={persistor} />
  </Provider>
);

serviceWorker.unregister();

reportWebVitals();
