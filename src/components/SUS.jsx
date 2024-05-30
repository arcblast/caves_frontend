import React from 'react'
import Header from './Header'
import Footer from './Footer'

const SUS = () => {
  return (
    <>
      <Header />
      <div className='container my-5'>
        <iframe
          src='https://docs.google.com/forms/d/e/1FAIpQLSfNf1UM0NbZ8ygtnttG-jAsh4ATJl3aeJ6lv4Ah8fGaz1nzdQ/viewform?usp=pp_url'
          className='w-full h-screen rounded-md'
        />
      </div>
      <Footer />
    </>
  )
}

export default SUS