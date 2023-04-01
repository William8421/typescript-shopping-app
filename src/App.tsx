import Home from './pages/Home'
import Navbar from './components/Navbar'
import { ShoppingCartProvider } from './context/shoppingCartContext'
import './styles/style.scss'

function App() {
    
  return (
    <div className='App'>
     <ShoppingCartProvider>
     <Navbar />
     <Home/>
   </ShoppingCartProvider>
   </div>
  )
}

export default App
