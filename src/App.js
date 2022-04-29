import AdminPage from "./pages/adminPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import PetsPage from "./pages/PetsPage";
import PetPage from "./pages/PetPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AuthProvider from "./components/AuthProvider";
import UserProvider from "./components/UserProvider";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <AuthProvider>
        <UserProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminPage />
                </AdminProtectedRoute>
              }
            />
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
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pet/:id"
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
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
