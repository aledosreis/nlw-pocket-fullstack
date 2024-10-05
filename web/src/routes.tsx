import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/login";
import { Register } from "@/pages/register";
import { Goals } from "@/pages/goals";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:username" element={<Goals />} />
      </Routes>
    </BrowserRouter>
  )
}