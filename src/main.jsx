import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import DetailedView from "./pages/DetailedPage"
import Home from "./pages/Home/index.jsx"
import List from "./pages/List"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path=":toggleMenu" element={<List />} />
          <Route path="details/:id" element={<DetailedView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
