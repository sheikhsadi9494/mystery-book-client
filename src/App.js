import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashbordHome from './Dashbord/DashbordHome/DashbordHome';
import ProfileContainer from './Dashbord/Profile/ProfileContainer/ProfileContainer';
import Login from './Login/Login/Login';
import Register from './Login/Register/Register';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import HomeContainer from './Dashbord/HomePage/HomeContainer/HomeContainer';

function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute><DashbordHome /></PrivateRoute>}>
          <Route index element={<HomeContainer></HomeContainer>}/>
          <Route path='profile' element={<ProfileContainer></ProfileContainer>}/>
        </Route>
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register />}/>
      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
