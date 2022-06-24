import { AuthContextProvider } from "./contexts/auth-context";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import DisableAuthenticateRoute from "./components/DisableAuthenticateRoute";

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DisableAuthenticateRoute />}>
              <Route path="login" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>

            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
};

export default App;
