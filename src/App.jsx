import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import LandingPageScreen from "./components/screens/LandingPageScreen";
import LoginPagescreen from "./components/screens/LoginScreen";
import RegisterPage from "./components/screens/Register";
import DashboardScreen from "./components/screens/DashboardScreen";
import { getLoadingState, getLoggedInUser } from "./redux/ShortenUrls/ShortenUlrsSlice";
import { useMemo } from "react";

// Public Routes - Accessible to All Users
const PUBLIC_ROUTES = [
  { path: "/", element: <LandingPageScreen /> },
  { path: "/login", element: <LoginPagescreen /> },
  { path: "/register", element: <RegisterPage /> },
];

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const user = useSelector(getLoggedInUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (location.pathname !== "/dashboard") {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

function App() {
  const user = useSelector(getLoggedInUser);

  // Memoizing routes for optimization
  const publicRoutes = useMemo(
    () =>
      PUBLIC_ROUTES.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      )),
    []
  );

  return (
    <ToastProvider autoDismiss placement="top-right">
      <Router>
        <div className="justify-center">
          <Routes>
            {/* Public Routes */}
            {publicRoutes}

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<DashboardScreen />} />}
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
