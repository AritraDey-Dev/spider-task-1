import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/homes";
import CreateRecipe from "./pages/create-recipe";
import SavedRecipes from "./pages/saved-recipe";
import Register from "./components/register";
import Login from "./components/login";
import axios from "axios";
import Auth from "./pages/auth";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/saved-recipe" element={<SavedRecipes />} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </Router>
  );
}

export default App;
