import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/home" element={<Main />} />
    </Routes>
  );
}

export default App;
