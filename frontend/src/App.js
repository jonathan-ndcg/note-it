import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import NoteApp from './components/NoteApp';
import Login from './components/Login';
import AuthContext, { AuthContextProvider } from "./store/auth-context";
import RequireAuth from "./components/RequireAuth";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from "react";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<NoteApp />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;