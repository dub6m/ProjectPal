import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Login from './Pages/Login/Login.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import Projects from './Pages/Projects/Projects.jsx';
import Project from './Pages/Project/Project.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import { UserProvider } from './UserContext.jsx';

function App() {
  return (
    <>
    <UserProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/projects/:id" element={<Project/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
      </BrowserRouter>
    </UserProvider>
    </>
  )
}
export default App
