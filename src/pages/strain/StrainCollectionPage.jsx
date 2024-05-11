import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

const StrainCollectionPage = () => {

  return (
    <>
      <Header />   
      <Outlet />
    </>
    
  )
}

export default StrainCollectionPage