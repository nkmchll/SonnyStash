import './index.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/navbar'
import Home from './pages/home' 
import Register from './pages/register'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import { themeSettings } from './theme'
import { ThemeProvider, createTheme } from '@mui/material/styles'


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const theme = createTheme(themeSettings());

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <Navbar></Navbar>
        <Toaster position='bottom-right' toastOptions = {{duration: 2000}}></Toaster>
        <Routes>
          <Route path = '/' element={<Home/>}/>
          <Route path = '/register' element={<Register></Register>}/>
          <Route path = '/login' element={<Login></Login>}/>
          <Route path = '/dashboard' element={<Dashboard/>}/>
        </Routes>
      </UserContextProvider>
    </ThemeProvider>
    
  )
}

export default App
