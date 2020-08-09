import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
      <Link to="/hdgl">Hdgl</Link>
      <Link to="/study">Study</Link>
    </div>
  )
}

export default Home
