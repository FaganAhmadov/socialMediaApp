import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routers } from './routers'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <>
      <RouterProvider router={routers} />
      <ToastContainer />
    </>
  )
}

export default App