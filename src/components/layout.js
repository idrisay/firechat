// components/layout.js

import Navbar from './Navbar'
// import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className='pt-[8vh]'>{children}</main>
      {/* <Footer /> */}
    </>
  )
}