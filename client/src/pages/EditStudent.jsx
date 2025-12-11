import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

function EditStudent() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const initial = useMemo(() => location.state?.student, [location.state])
  const [full_name, setFullName] = useState(initial?.full_name || '')
  const [email, setEmail] = useState(initial?.email || '')
  const [course, setCourse] = useState(initial?.course || '')
  const [admission_year, setAdmissionYear] = useState(initial?.admission_year || '')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (initial) return
    fetch(`${API_BASE}/students?page=1&limit=1000`)
      .then((r) => r.json())
      .then((j) => {
        const s = j.data.find((x) => x._id === id)
        if (s) {
          setFullName(s.full_name)
          setEmail(s.email)
          setCourse(s.course || '')
          setAdmissionYear(s.admission_year || '')
        }
      })
      .catch(() => {})
  }, [id, initial])

  function submit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    fetch(`${API_BASE}/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, course, admission_year: admission_year ? Number(admission_year) : undefined })
    })
      .then(async (r) => {
        if (r.ok) navigate('/')
        else {
          const j = await r.json().catch(() => ({}))
          setError(j.error || 'Failed to update student')
        }
      })
      .catch(() => setError('Network error'))
      .finally(() => setBusy(false))
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Edit Student</h2>
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

export default EditStudent
