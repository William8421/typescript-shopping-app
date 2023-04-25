import Home from './pages/Home'
import Store from './pages/Store'
import Navbar from './components/Navbar'
import { ShoppingCartProvider } from './context/shoppingCartContext'
import './styles/style.scss';
import { Route, Routes } from 'react-router-dom'
import MyProfile from './components/MyProfile';

function App() {
    
  return (
    <div className='App'>
     <ShoppingCartProvider>
     <Navbar />
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/store' element={<Store/>}/>
      <Route path='myprofile' element={<MyProfile/>} />
     </Routes>
     
   </ShoppingCartProvider>
   </div>
  )
}

export default App
