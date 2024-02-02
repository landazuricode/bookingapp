import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import InfoHotel from "./components/infoHotel";
import Reservations from "./components/reservations";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Header>
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/register" Component={Register} />
            <Route exact path="/login" Component={Login} />
            <Route path="/hotels/:id" element={<InfoHotel />} />
            <Route path="/reservation" element={<Reservations />} />
          </Routes>
        </Header>
      </div>
    </HashRouter>
  );
}

export default App;
