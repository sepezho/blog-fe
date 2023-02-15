import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Blogs from "./pages/Blog";
import NoPage from "./pages/NoPage";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<Blogs />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
