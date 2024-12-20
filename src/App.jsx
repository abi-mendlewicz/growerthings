import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailsContainer from './components/ItemDetailsContainer'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'

function App() {

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ItemListContainer />} />
          <Route path='/productos' element={<ItemListContainer />} />
          <Route path='/categoria/:category' element={<ItemListContainer />} />
          <Route path='/producto/:itemId' element={<ItemDetailsContainer />} />
          <Route path='/quienes-somos' element={<AboutPage />} />
          <Route path='/contacto' element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
