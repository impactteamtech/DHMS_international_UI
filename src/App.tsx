import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollDownButton from './components/ScrollDownButton'
import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Shop from './components/Shop/Shop'
import Cart from './components/Cart/Cart'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import { AuthProvider } from './components/Context/AuthContext'
import { ToastContainer } from "react-toastify";
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

const sectionIds = ['hero', 'banner', 'categories', 'Highlights', 'InStore', 'testimonials',]

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = () => {
    const nextIndex = (currentIndex + 1) % sectionIds.length
    const nextId = sectionIds[nextIndex]
    const section = document.getElementById(nextId)
    if (section) {
      setCurrentIndex(nextIndex)
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={2500} />
        <ScrollDownButton onClick={handleScroll} />

        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='shop' element={<Shop />} />
            <Route path='cart' element={<Cart />} />
            <Route path='login' element={<SignIn />} />
            <Route path='register' element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
