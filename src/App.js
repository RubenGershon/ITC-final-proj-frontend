import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import PetPage from "./pages/PetPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AuthProvider from "./components/AuthProvider";
import UserProvider from "./components/UserProvider";
import UserPage from "./pages/UserPage";

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
              path="/admin/user/:id"
              element={
                <AdminProtectedRoute>
                  <UserPage />
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
            <Route path="/search" element={<SearchPage />} />
            <Route path="/pet/:id" element={<PetPage />} />
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
