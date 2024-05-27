import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import BarGraph from './BarGraph'
import { getSampleTypeData, getTypeDescriptionData, useGetDataQuery } from './utils'

const StatisticsPage = () => {
  const strains = useGetDataQuery()  

  const sampletypeData = getSampleTypeData(strains.data)
  const typedescriptionData = getTypeDescriptionData(strains.data)

  return (
    <>
      <Header />
      <div className='container relative space-y-5'>
        <div className='flex mt-10 justify-end font-inter'>
          <h1 className='lg:text-3xl text-lg font-bold flex-1 text-primary tracking-tight'>Statistics</h1>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div className='col-span-1'>
            <BarGraph data={sampletypeData} title={'Occurences per Sample Data'} />
          </div>
          <div className='col-span-1'>
            <BarGraph data={typedescriptionData} title={'Occurences per Type Description'} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StatisticsPage