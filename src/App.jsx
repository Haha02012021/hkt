import "./App.css";
import Home from "./Container/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
