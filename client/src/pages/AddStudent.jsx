import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

function AddStudent() {
  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [admission_year, setAdmissionYear] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, course, admission_year: admission_year ? Number(admission_year) : undefined })
    })
      .then(async (r) => {
        if (r.status === 201) navigate('/')
        else {
          const j = await r.json().catch(() => ({}))
          setError(j.error || 'Failed to add student')
        }
      })
      .catch(() => setError('Network error'))
      .finally(() => setBusy(false))
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Add Student</h2>
      {error && <div className="error">{error}</div>}
      <label>
        Full Name
        <input value={full_name} onChange={(e) => setFullName(e.target.value)} required />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Course
        <input value={course} onChange={(e) => setCourse(e.target.value)} />
      </label>
      <label>
        Admission Year
        <input type="number" value={admission_year} onChange={(e) => setAdmissionYear(e.target.value)} />
      </label>
      <div className="actions">
        <button type="submit" disabled={busy}>Save</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </form>
  )
}

export default AddStudent
