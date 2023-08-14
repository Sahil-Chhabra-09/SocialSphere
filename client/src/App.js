import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage/home";
import LoginPage from "scenes/loginPage/login";
import ProfilePage from "scenes/profilePage/profile";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import UserWidget from "scenes/widgets/UserWidget";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.token);
  return (
    <div className="p-0 m-0">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/*css reset */}
          <Routes>
            <Route path="/" Component={LoginPage} />
            <Route path="/home" Component={isAuth ? HomePage : LoginPage} />
            <Route
              path="/profile/:userId"
              Component={isAuth ? ProfilePage : LoginPage}
            />
            <Route path="/test" Component={UserWidget} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
