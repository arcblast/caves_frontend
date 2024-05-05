import Header from '@/components/Header'
import IsolationMap from './IsolationMap'
import IsolationNav from '@/components/IsolationNav'
import Sidebar from '@/components/Sidebar'
import { DataTable } from '@/components/DataTable'
import { isolation_columns, visible_isolation_columns } from './isolation_columns'
import { useToast } from '@/components/ui/use-toast'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useMemo } from 'react'

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

const IsolationSourcePage = () => {
  const strains = getStrains()
  const data = useMemo( () => strains ?? [], [strains])

  return (
    <>
      <Header />
      <div className='flex'>
        <div className='flex-grow overflow-y-scroll'>
          <IsolationNav />
          <IsolationMap />
          <DataTable data={data} columns={isolation_columns} visible_columns={visible_isolation_columns} />
        </div>
        <Sidebar className='' />
      </div>
    </>
    
  )
}

export default IsolationSourcePage