import StrainForm from "./StrainForm"
import BodyLayout from "@/components/BodyLayout"
import { Button } from "@/components/ui/button"
import { ArrowLeftCircle } from "lucide-react"
import { NavLink, useParams } from "react-router-dom"

const UpdateStrain = () => {
  // console.log(strain)
  const {id} = useParams()

  // const {strain} =
  return (
    <>
      <div className='flex mt-10 mx-8 justify-end'>
        <h1 className='lg:text-3xl text-lg font-bold flex-1'>Strain Collection</h1>
        <NavLink
          key={'strain-collection-update'}
          to={'/strain-collection'}
        >
          <Button className='pl-2'><ArrowLeftCircle className='h-4' />Back</Button>
        </NavLink>
      </div>

      <BodyLayout title={'Strain Update'} content={<StrainForm />} />
    </>
  )
}

export default UpdateStrain