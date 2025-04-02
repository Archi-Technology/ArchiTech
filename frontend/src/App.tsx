import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Feed } from './components/feed';
import { LoginWrapper } from './components/loginWrapper';
import Navbar from './components/navbar';
import './index.scss';
import { LoginScreen } from './views/Login';
import Profile from './views/Profile';
import MapView from './views/Map';

const App: React.FC = () => {


  return (
    <div className='whole-app'>

        <LoginWrapper>
          <>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/map" element={<MapView />} />
              </Route>
              {/* Add other routes here */}
            </Routes>
          </>
        </LoginWrapper>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
        <ToastContainer position="bottom-left" />
    </div>
  )
};

const MainLayout: React.FC = () => (
  <>
    {/* <Navbar /> */}
    {/* <div className="content"> */}
      <Outlet />
    {/* </div> */}
  </>
);

export default App;
