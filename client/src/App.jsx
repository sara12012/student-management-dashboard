import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import StudentList from './pages/StudentList.jsx'
import AddStudent from './pages/AddStudent.jsx'
import EditStudent from './pages/EditStudent.jsx'

function App() {
  const navigate = useNavigate()
  return (
    <div className="app">
      <header className="header">
        <h1>Student Management</h1>
        <nav className="nav">
          <button onClick={() => navigate('/')}>List</button>
          <button onClick={() => navigate('/add')}>Add</button>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
