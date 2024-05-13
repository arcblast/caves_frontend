import Cave from '../../assets/cave_hero.svg'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"


const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex items-center px-20 pb-20">
      <img className="justify-between items-center h-96 mr-10" src={Cave} alt='Hero' />
      <div>
        <h1 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-300 mb-5 py-2">
          Cave Microbial Culture Collection Information System
        </h1>
        <p className="text-base leading-8 mb-5 ">
          <span className=" italic font-semibold">caves</span> is a website containing curated culture collection strains and information. This research project will provide a collection and inventory of the microbiome metadata of gut and guano of bat species present in caves in CALABARZON.
        </p>
        <div>
          <Button size='lg' className='pr-6 mr-4' onClick={() => navigate('/signup')} >
            Get Started
            <ArrowRight className="ml-2 h-4" />
          </Button>
          <Button variant='secondary' size='lg' className='pr-6' onClick={() => navigate('/isolation-source')} >
            Explore Isolation Source
            <ArrowRight className="ml-2 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero