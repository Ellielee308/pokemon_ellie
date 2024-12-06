import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import DigimonDetails from "./pages/DigimonDetails";
import DigimonList from "./pages/DigimonList";
import Home from "./pages/Home/index.jsx";
import PokemonDetails from "./pages/PokemonDetails";
import PokemonList from "./pages/PokemonList";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="pokemon" element={<PokemonList />} />
          <Route path="digimon" element={<DigimonList />} />
          <Route path="pokemon/:id" element={<PokemonDetails />} />
          <Route path="digimon/:id" element={<DigimonDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
