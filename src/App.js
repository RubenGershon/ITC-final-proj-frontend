import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import PetsPage from "./pages/PetsPage";
import PetPage from "./pages/PetPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./components/AuthProvider";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets"
            element={
              <ProtectedRoute>
                <PetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets/:id"
            element={
              <ProtectedRoute>
                <PetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
