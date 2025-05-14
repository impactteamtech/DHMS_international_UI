import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollDownButton from './components/ScrollDownButton'
import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Shop from './components/Shop/Shop'
import Cart from './components/Cart/Cart'

const sectionIds = ['hero', 'categories', 'banner', 'testimonials']

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
    <BrowserRouter>
      <ScrollDownButton onClick={handleScroll} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop/>}/>
          <Route path='cart' element={<Cart/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
