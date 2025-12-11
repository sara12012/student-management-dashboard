import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

function StudentList() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState({ data: [], page: 1, limit: 10, total: 0, pages: 0 })
  const [page, setPage] = useState(1)
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  const query = useMemo(() => ({ search, page, limit: data.limit }), [search, page, data.limit])

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams()
      if (query.search) params.set('search', query.search)
      params.set('page', String(query.page))
      params.set('limit', String(query.limit))
      setBusy(true)
      fetch(`${API_BASE}/students?${params.toString()}`)
        .then((r) => r.json())
        .then((j) => setData(j))
        .catch(() => {})
        .finally(() => setBusy(false))
    }, 300)
    return () => clearTimeout(t)
  }, [query.search, query.page, query.limit])

  function remove(id) {
    if (!confirm('Delete this student?')) return
    fetch(`${API_BASE}/students/${id}`, { method: 'DELETE' })
      .then((r) => {
        if (r.status === 204) {
          const nextPage = data.data.length === 1 && page > 1 ? page - 1 : page
          setPage(nextPage)
        }
      })
      .catch(() => {})
  }

  return (
    <div>
      <div className="toolbar">
        <input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
        />
        <Link to="/add">Add Student</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Year</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((s) => (
            <tr key={s._id}>
              <td>{s.full_name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{s.admission_year || ''}</td>
              <td>{new Date(s.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => navigate(`/edit/${s._id}`, { state: { student: s } })}>Edit</button>
                <button onClick={() => remove(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {data.data.length === 0 && (
            <tr>
              <td colSpan={6}>{busy ? 'Loading…' : 'No records'}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {data.page} of {data.pages || 1}
        </span>
        <button disabled={data.page >= data.pages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default StudentList
