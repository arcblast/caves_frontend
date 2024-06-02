import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import BarGraph from './BarGraph'
import { getProvinceData, getSampleTypeData, getSamplingSiteData, getTypeDescriptionData, useGetDataQuery } from './utils'
import StatCards from './StatCards'
import { useSelector } from 'react-redux'

const StatisticsPage = () => {
  const { user } = useSelector( (state) => state.auth )
  const strains = useGetDataQuery()  
  // const data = useMemo( () => strains ?? [], [strains])
  const [ filteredData, setFilteredData ] = useState(strains.data)

  useEffect(() => {
    try {
      user?.user_level === 'ADMIN' ? setFilteredData(strains.data) : setFilteredData(strains.data?.filter(item => item.hide === false))
    } catch (error) {
      setFilteredData([])
    }
  }, [strains])

  // const sampletypeData = getSampleTypeData(strains.data)
  // const typedescriptionData = getTypeDescriptionData(strains.data)
  // const samplingsiteData = getSamplingSiteData(strains.data)
  // const provinceData = getProvinceData(strains.data)
  const sampletypeData = getSampleTypeData(filteredData)
  const typedescriptionData = getTypeDescriptionData(filteredData)
  const samplingsiteData = getSamplingSiteData(filteredData)
  const provinceData = getProvinceData(filteredData)

  return (
    <>
      <Header />
      <div className='container relative space-y-5'>
        <div className='flex mt-10 justify-end font-inter'>
          <h1 className='lg:text-3xl text-lg font-bold flex-1 text-primary tracking-tight'>Statistics</h1>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-full'>
            <StatCards data={filteredData} />
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