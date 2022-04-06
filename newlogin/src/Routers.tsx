import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AuthProvider from './context/AuthContext';
import Address from './pages/address/Address';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NotFound from './pages/notFound/NotFound';
import Users from './pages/users/Users';

function Routers() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Header />
        <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/address' element={<Address/>}/>
        </Routes>
      <Footer/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers;