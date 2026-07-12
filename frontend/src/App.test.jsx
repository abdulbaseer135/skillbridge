import { render, screen } from '@testing-library/react'
import App from './App.jsx'

test('renders app with navbar and footer', () => {
  render(<App />)
  expect(screen.getByRole('navigation')).toBeInTheDocument()
  expect(screen.getByText(/skillbridge/i)).toBeInTheDocument()
})
