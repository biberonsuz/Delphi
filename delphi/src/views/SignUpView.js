import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match')
      return
    }

    setError('')

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)  // Store JWT token in localStorage
        navigate('/app')  // Redirect to a protected route
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (err) {
      console.error('An error occurred:', err)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className="h-dvh w-vw flex justify-center items-center">
      <form className="w-1/5 flex flex-col justify-center items-center space-y-2" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-3xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="w-full rounded-3xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          className="w-full rounded-3xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="w-full rounded-3xl px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-60" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp