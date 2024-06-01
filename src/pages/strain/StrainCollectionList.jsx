import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import strainService from '@/features/strain/strainService'
import { useSelector } from 'react-redux'
import { strain_columns, visible_strain_columns } from './strain_columns'

function getStrains() {
  const { user } = useSelector( (state) => state.auth )
  const {toast} = useToast()

  const { data, isFetching, isPending, isError } = useQuery({
    queryFn: () => strainService.getStrainByUser(user.token),
    queryKey: ['collection'],
    onError: (error) => {
      console.log(error)
    },
    refetchInterval: 600000
  });

  if( isPending || isFetching ) {
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
  // console.log(data)
  // const columns = strain_columns() ?? []
  // console.log(columns)

  return (
    <>
      <div className='flex mt-10 justify-end font-inter'>
        <h1 className='lg:text-3xl text-lg font-bold flex-1 text-primary tracking-tight'>Strain Collection</h1>
        {/* <AddStrain /> */}
        <Link
          key={'strain-collection-add'}
          to={'/strain-collection/add'}
        >
          <Button className='pl-2'><PlusIcon className='h-4' /> Add strain</Button>
        </Link>
      </div>

      <DataTable data={data} columns={strain_columns} visible_columns={visible_strain_columns} column_filter={[]} />
    </>
  )
}

export default StrainCollectionList