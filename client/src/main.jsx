import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import OrganizationPage from './pages/OrganizationPage'
import DonateForm from './components/DonateForm'
import SearchPage from './pages/SearchPage'
import Tags from './pages/Tags'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='text-3xl text-red-500 p-16'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/profile/:userId',
        element: <ProfilePage />,
      },
      {
        path: '/organization/:organizationId',
        element: <OrganizationPage />,
      },
      {
        path: '/donate',
        element: <DonateForm />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/tags',
        element: <Tags />,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
