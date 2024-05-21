import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

const StrainCollectionPage = () => {

  return (
    <>
      <Header />
      {/* <div className='container relative'> */}
        <Outlet />
      {/* </div> */}
    </>
    
  )
}

export default StrainCollectionPage