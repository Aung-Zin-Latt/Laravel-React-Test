import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from './views/Login';
import NotFound from './views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuessLayout from './components/GuessLayout';
import Dashboard from './views/Dashboard';
import SignUp from './views/SignUp';
import Employees from './views/Employees';
import EmployeeForm from './views/EmployeeForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/employees',
        element: <Employees />
      },
      {
        path: '/employees/new',
        element: <EmployeeForm key="employeeCreate" />
      },
      {
        path: '/employees/:id',
        element: <EmployeeForm key="employeeUpdate" />
      },
    ]
  },
  {
    path: '/',
    element: <GuessLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  },
])


export default router;
