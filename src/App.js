import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";           
import CreateAccount from "./pages/createAccount";
import CreatePitch from "./pages/createPitch";
import DisplayPitches from "./pages/displayPitches";
import Invest from "./pages/invest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-pitch" element={<CreatePitch />} />
        <Route path="/display-pitches" element={<DisplayPitches />} />
        <Route path="/invest" element={<Invest />} /> 
      </Routes>
    </Router>
  );
}

export default App;
