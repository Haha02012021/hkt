import "./App.css";
import Home from "./Container/Home";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home/*" element={<Home />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        newestOnTop={true}
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable
        style={{ textAlign: "left" }}
      />
    </div>
  );
}

export default App;
