import { NavLink } from 'react-router-dom'

export default function Home() {
  return (
    <div className='home-container'>
        <div className='home-app-name'>
        <h2>Welcome to</h2>
          <h1>Shopping Cart App</h1>
        <NavLink className='start-shopping' to='/store'>
        <h3>Start Shopping</h3>
        </NavLink>
        </div>
    </div>
  )
}
