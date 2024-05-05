import Header from "@/components/Header"
import StrainForm from "./StrainForm"
import BodyLayout from "@/components/BodyLayout"

const UpdateStrain = () => {
  return (
    <>
      <Header />
      {/* <StrainForm /> */}
      {/* <div className="overflow-hidden rounded-lg border bg-background/20 p-4 lg:m-4 shadow-md md:shadow-xl">
        <StrainForm />
      </div> */}
      <BodyLayout title={'Strain Update'} content={<StrainForm />} />
    </>
  )
}

export default UpdateStrain