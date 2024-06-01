import { Copyright } from 'lucide-react'
import Logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className='w-full bg-background/30 flex flex-col justify-center items-center mt-10 py-3'>
      <div className='flex flex-row justify-center items-center w-full text-sm font-poppins text-muted-foreground gap-x-4'>
        <Link to='/'>Home</Link>
        <p>|</p>
        <Link to='/isolation-source'>Isolation source</Link>
        <p>|</p>
        <Link to='/statistics'>Statistics</Link>
        <p>|</p>
        <Link to='/sus'>About</Link>
      </div>

      {/* <p className='text-sm text-muted-foreground font-poppins'>University of the Philippines Los Banos, Laguna, 4030</p>    */}
      
      <img src={Logo} className='h-12'/>

      <p className=' flex flex-row items-center font-poppins text-muted-foreground justify-center text-sm'><Copyright className='h-4' />Copyright 2024</p>

    </div>
    <div className='w-full bg-gradient-to-r from-primary to-yellow-300 h-2' />
    </>
  )
}

export default Footer