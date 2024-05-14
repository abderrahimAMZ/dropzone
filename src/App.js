import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/PrivateRoute";

import { FileBrowser, FileUploader, Profile, Register, PasswordReset } from "./pages/LazyPages";
import {Suspense} from "react";
import LinearProgress from "@mui/material/LinearProgress";




function App() {
  return (
      <div className="App">
        <Router>
          <AuthProvider>
            <Routes>
                <Route path={"/register"} element={<Suspense fallback={<LinearProgress />}> <Register /> </Suspense>} />
                <Route path="/resetPassword" element={<Suspense fallback={<LinearProgress />}><PasswordReset /> </Suspense>} />
                <Route element={<PrivateRoute />}>
                    <Route path={"/browse-files"} element={<Suspense fallback={<LinearProgress />}><FileBrowser /> </Suspense>} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path={"/profile"} element={<Suspense fallback={<LinearProgress />}><Profile /> </Suspense>} />
                </Route>
                <Route path="/login" element={<Suspense fallback={<LinearProgress />}><Login /></Suspense>} />
              <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Suspense fallback={<LinearProgress />}><FileUploader /></Suspense>}></Route>
              </Route>

              {/* Other routes */}
            </Routes>
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;
