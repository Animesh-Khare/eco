import Questions from "./components/Questions/Questions";
import Typeform from "./components/Typeform/Typeform";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/typeform" />}></Route>
        <Route path="/typeform" element={<Typeform />}></Route>
        <Route path="/questions" element={<Questions />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
