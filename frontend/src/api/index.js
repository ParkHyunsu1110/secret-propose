const API_BASE = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) throw new Error(`API ${res.status}`)

  const json = await res.json()
  if (json.code !== 'SUCCESS') throw new Error(json.message || 'API Error')

  return json.data
}

export function fetchMemories() {
  return request('/api/memories')
}

export function fetchLetter() {
  return request('/api/letter')
}

export function acceptPropose() {
  return request('/api/propose/accept', { method: 'POST' })
}

export function fetchProposeStatus() {
  return request('/api/propose/status')
}

export function recordVisit(page) {
  return request('/api/visit', {
    method: 'POST',
    body: JSON.stringify({ page }),
  })
}
