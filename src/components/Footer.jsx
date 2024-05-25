import { Copyright } from 'lucide-react'
import Logo from '../assets/logo.svg'

const Footer = () => {
  return (
    <>
    {/* <div className='w-full bg-primary h-2' />
    <div className='w-full bg-gradient-to-r from-green-200 to-yellow-200  h-20'>

    </div> */}

    {/* <div className='w-full bg-foreground h-2' />
    <div className='w-full bg-primary h-2' /> */}
    {/* <div className='w-full bg-gradient-to-r from-primary to-yellow-300  h-20'> */}
    {/* <div className='w-full bg-gradient-to-r from-yellow-300 to-primary h-2' /> */}
    <div className='w-full bg-background/30 flex flex-col justify-center items-center'>
      <div className='flex flex-row justify-center items-center w-full text-sm font-poppins text-muted-foreground gap-x-4'>
        <p>Home</p>
        <p>|</p>
        <p>Taxonomy</p>
        <p>|</p>
        <p>Isolation source</p>
      </div>

      <p className='text-sm text-muted-foreground font-poppins'>University of the Philippines Los Banos, Laguna, 4030</p>   
      
      <img src={Logo} className='h-12'/>

      <p className=' flex flex-row items-center font-poppins justify-center text-sm'><Copyright className='h-4' />Copyright 2024</p>

    </div>
    <div className='w-full bg-gradient-to-r from-primary to-yellow-300 h-2' />
    </>
  )
}

export default Footer