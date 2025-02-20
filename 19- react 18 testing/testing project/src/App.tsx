import { BrowserRouter, Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  return (
    <>
      <NavBar />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
