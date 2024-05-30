import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import BarGraph from './BarGraph'
import { getProvinceData, getSampleTypeData, getSamplingSiteData, getTypeDescriptionData, useGetDataQuery } from './utils'
import StatCards from './StatCards'

const StatisticsPage = () => {
  const strains = useGetDataQuery()  

  const sampletypeData = getSampleTypeData(strains.data)
  const typedescriptionData = getTypeDescriptionData(strains.data)
  const samplingsiteData = getSamplingSiteData(strains.data)
  const provinceData = getProvinceData(strains.data)

  return (
    <>
      <Header />
      <div className='container relative space-y-5'>
        <div className='flex mt-10 justify-end font-inter'>
          <h1 className='lg:text-3xl text-lg font-bold flex-1 text-primary tracking-tight'>Statistics</h1>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-full'>
            <StatCards data={strains.data} />
          </div>
          <div className='col-span-1'>
            <BarGraph data={typedescriptionData} title={'Type Description'} />
          </div>
          <div className='col-span-1'>
            <BarGraph data={sampletypeData} title={'Sample Type'} />
          </div>
          <div className='col-span-1'>
            <BarGraph data={samplingsiteData} title={'Sampling Site'} />
          </div>
          <div className='col-span-1'>
            <BarGraph data={provinceData} title={'Province'} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StatisticsPage