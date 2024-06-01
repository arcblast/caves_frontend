import Cave from '../../assets/cave_hero.svg'
import Logo from '../../assets/logo.svg'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"


const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className='flex justify-center lg:-mt-10'>
      <div className='lg:h-screen lg:grid lg:grid-cols-3 w-3/4 items-center gap-x-5 sm:flex sm:flex-col-reverse'>
        <div className='lg:col-span-2 items-center sm:col-span-full'>
          <>
          <img src={Logo} alt='CAVES' className='h-20 z-50'/>
          <h1 className="-mt-3 text-4xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-300 leading-normal">
            Microbial Culture Collection Information System
          </h1>
          </>
          <p className="text-base leading-6 mt-2 mb-8 pr-4 font-inter">
            <span className=" italic font-semibold">caves</span> is a website containing curated culture collection strains and information. This research project will provide a collection and inventory of the microbiome metadata of gut and guano of bat species present in caves in CALABARZON.
          </p>
          <div>
            <Button size='lg' className='pr-6 mr-4 font-poppins' onClick={() => navigate('/signup')} >
              Get Started
              <ArrowRight className="ml-2 h-4" />
            </Button>
            <Button variant='secondary' size='lg' className='pr-6 font-poppins' onClick={() => navigate('/isolation-source')} >
              Explore Isolation Source
              <ArrowRight className="ml-2 h-4" />
            </Button>
          </div>
        </div>
        <div className='lg:col-span-1 sm:col-span-full'>
          <img className=" flex justify-between items-center lg:w-full lg:px-0 sm:px-10" src={Cave} alt='Hero' />
        </div>
      </div>
    </div>
  )
}

export default Hero