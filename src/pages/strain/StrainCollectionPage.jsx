import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import React, { useEffect, useMemo } from 'react'
import AddStrain from './AddStrain'
import strainService from '@/features/strain/strainService'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import Skeleton from '@/components/LoadingSkeleton'
import { DataTable } from '@/components/DataTable'
import { useToast } from '@/components/ui/use-toast'
import { strain_columns } from './colum./strain_columns'

function getStrains() {
  const {toast} = useToast()

  const { data, isLoading, isFetching, isError } = useQuery({
    queryFn: () => strainService.getAllStrains(),
    queryKey: ["strains"],
    onError: (error) => {
      console.log(error)
    },
  });

  useEffect(() => {
    if(isLoading|| isFetching) {
      <Skeleton />
    }

    if(isError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      })
    }
  }, [ isLoading, isFetching ])

  return data
}

const StrainCollectionPage = () => {
  const { user } = useSelector( (state) => state.auth )
  const strains = getStrains()
  const data = useMemo( () => strains ?? [], [strains])

  return (
    <>
			<Header />
      <div className='w-full flex mt-10 mx-5 justify-end'>
        <h1 className='lg:text-3xl text-lg font-bold flex-1'>Strain Collection</h1>
        <AddStrain />
      </div>
      <DataTable data={data} columns={strain_columns} />
    </>
  )
}

export default StrainCollectionPage