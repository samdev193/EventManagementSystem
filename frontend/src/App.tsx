import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from "./components/common/sidebar"
import Home from "./pages/Home"
import Header from "./components/common/Header"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
const App: React.FC = () => {
  return (
    <div className="App">
        <div className="App-sidebar">
        <Router>
            <Sidebar/>
            <div className={"page"}>
            <Header />
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/Register"} element={<Register />}></Route>
                <Route path={"/Login"} element={<Login />}></Route>
            </Routes>
            </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
