import Home from './pages/Home'
import Store from './pages/Store'
import Navbar from './components/Navbar'
import { ShoppingCartProvider } from './context/shoppingCartContext'
import './styles/style.scss';
import { Route, Routes } from 'react-router-dom'
import MyProfile from './components/MyProfile';
import { UserProvider } from './context/userContext';

function App() {
    
  return (
    <div className='App'>
      <UserProvider>
     <ShoppingCartProvider>
     <Navbar />
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/store' element={<Store/>}/>
      <Route path='myprofile' element={<MyProfile/>} />
     </Routes>
     
   </ShoppingCartProvider>
   </UserProvider>
   </div>
  )
}

export default App
