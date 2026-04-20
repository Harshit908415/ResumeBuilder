import { Routes, Route } from "react-router-dom"
import Home from "./assets/pages/Home"
import Layout from "./assets/pages/Layout"
import Dashboard from "./assets/pages/Dashboard"
import ResumeBuilder from "./assets/pages/ResumeBuilder"
import Preview from "./assets/pages/Preview" //  add
import Loader from "./assets/components/Loader"
import { useDispatch } from "react-redux"
import api from "./configs/api"
import { useEffect, useState } from "react"
import {login, setLoading} from "./app/features/authSlice"
import Login from "./assets/pages/Login"
import {Toaster} from 'react-hot-toast'

function App() {

  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const { data } = await api.get('/api/users/data', {
          headers: {
            Authorization:
              token
          }
        })
        if (data.user) {
          dispatch(login({ token, user: data.user }))
        }
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error.message)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
      </Route>

      {/*  ye add karo */}
      <Route path="/public/:resumeId" element={<Preview />} />

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Loader />} />


    </Routes>
    </>
  );
}

export default App;