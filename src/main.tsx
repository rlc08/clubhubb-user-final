import ReactDOM  from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
 import { store } from "./store";
import { AuthProvider } from "./context/AuthProvider";
 ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);