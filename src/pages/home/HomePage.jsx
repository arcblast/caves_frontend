import Header from "@/components/Header"
import Statistics from "./Statistics"
import Hero from "./Hero"
import Footer from "@/components/Footer"

const HomePage = () => {
  
  return (
    <div>
			<Header />
			<Hero />

			<div className="mt-10 mb-20 px-4 py-8">
        <Statistics />
      </div>

      <Footer />
    </div>
  )
}

export default HomePage