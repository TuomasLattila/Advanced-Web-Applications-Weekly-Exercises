import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'

import MyContainer from "./components/MyContainer";
import About from "./components/About";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<> <Header /> <MyContainer /> </>}></Route>
        <Route path="/about" element={<> <Header /> <About /> </>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
