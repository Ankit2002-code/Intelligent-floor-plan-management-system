import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ViewPlans from "./pages/ViewPlans";
import UpdatePlans from "./pages/UpdatePlans";
import NotFound from "./pages/NotFound";
import AnimatedBackground from "./components/AnimatedBackground";

export default function App() {
  const [user, setUser] = useState("");
  const isAdmin = user === "admin";

  return (
    <>
      <AnimatedBackground />
      <Router>
        <Navbar isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/view" element={<ViewPlans user={user} />} />
          <Route path="/update" element={isAdmin ? <UpdatePlans user={user} /> : <Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
