import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/PrivateRoute";
import Register from "./pages/Register";
import FileUploader from "./pages/fileUploader";
import PasswordReset from "./pages/PasswordReset";
import FileBrowser from "./pages/FileBrowser";
import Profile from "./pages/Profile";

function App() {
  return (
      <div className="App">
        <Router>
          <AuthProvider>
            <Routes>
                <Route path={"/register"} element={<Register />} />
                <Route path="/resetPassword" element={<PasswordReset />} />
                <Route element={<PrivateRoute />}>
                <Route path={"/browse-files"} element={<FileBrowser />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path={"/profile"} element={<Profile />} />
                </Route>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<FileUploader />}></Route>
              </Route>

              {/* Other routes */}
            </Routes>
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;
