import { Route, Routes } from 'react-router'
import AcademyHome from './components/AcademyHome'
import AcademyDetail from './components/AcademyDetail'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AcademyHome />} />
      <Route path='/academies/:id' element={<AcademyDetail />} />
    </Routes>
  )
}

export default App
