import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { strain_columns } from './strain_columns'
import { useToast } from '@/components/ui/use-toast'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import strainService from '@/features/strain/strainService'

function getStrains() {
  const {toast} = useToast()

  const { data, isLoading, isFetching, isError } = useQuery({
    queryFn: () => strainService.getAllStrains(),
    queryKey: ["strains"],
    onError: (error) => {
      console.log(error)
    },
  });

  if( isLoading || isFetching ) {
    return <LoadingSkeleton />
  }

  if(isError) {
    return toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
    })
  }

  return data
}

const StrainCollectionList = () => {
  const strains = getStrains()
  const data = useMemo( () => strains ?? [], [strains])
  console.log(data)

  return (
    <>
      <div className='flex mt-10 mx-5 justify-end'>
        <h1 className='lg:text-3xl text-lg font-bold flex-1 text-primary'>Strain Collection</h1>
        {/* <AddStrain /> */}
        <Link
          key={'strain-collection-add'}
          to={'/strain-collection/add'}
        >
          <Button className='pl-2'><PlusIcon className='h-4' /> Add strain</Button>
        </Link>
      </div>

      <DataTable data={data} columns={strain_columns} />
    </>
  )
}

export default StrainCollectionList