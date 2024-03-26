import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
export default function Design() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
