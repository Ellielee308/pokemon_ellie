import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import DigimonDetails from "./presentation/pages/DigimonDetails";
import DigimonList from "./presentation/pages/DigimonList";
import Home from "./presentation/pages/Home/index.jsx";
import PokemonDetails from "./presentation/pages/PokemonDetails";
import PokemonList from "./presentation/pages/PokemonList";

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
