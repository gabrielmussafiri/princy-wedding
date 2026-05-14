import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Home  from './pages/Home'
import Admin from './pages/Admin'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"      element={<Home mode="full" />} />
          <Route path="/civil" element={<Home mode="civil" />} />
          <Route path="/full"  element={<Home mode="full" />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
