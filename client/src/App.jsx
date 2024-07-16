import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/Navbar';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import './App.css';
import MainPage from './components/mainPage/MainPage';
import Account from './components/account/Account';
import Access from './components/Access/Access';
import EditPassword from './components/auth/editPassword/EditPassword';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/access' element={<Access />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/acc' element={<Account />} />
        <Route path='/editPassword' element={<EditPassword />} />
        <Route path='/*' element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
