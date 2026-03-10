import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/signup";
import Main from "./pages/Main/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={<Main />} />
    </Routes>
  );
}

export default App;
