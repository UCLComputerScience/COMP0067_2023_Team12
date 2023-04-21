import { Outlet, Navigate } from 'react-router-dom';

// The function UploadImages is adapated from https://stackoverflow.com/questions/71351501/reactjs-typescript-creating-a-private-route-using-router-dom
const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;