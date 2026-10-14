import { Routes, Route } from "react-router-dom";
import RotaPrivada from "./RotaPrivada";
import NaoEncontrada from "./NaoEncontrada";
import Cadastro from "./Cadastro";
import Home from "./Home";
import Login from "./Login";

function App() {
  return(
  <Routes >
    <Route path="/" element={<Login />} />
    <Route path="/cadastro" element={<Cadastro />} />
    <Route path="/home" element={
      <RotaPrivada><Home /></RotaPrivada>
    } />
    <Route path="*"
           element={<NaoEncontrada />}/>
  </Routes >
  );
}

export default App;
