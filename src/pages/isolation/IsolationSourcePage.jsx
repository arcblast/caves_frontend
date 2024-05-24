import Header from '@/components/Header'
import IsolationMap from './IsolationMap'
import { DataTable } from '@/components/DataTable'
import { isolation_columns, visible_isolation_columns, column_filter } from './isolation_columns'
import { useToast } from '@/components/ui/use-toast'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import IsolationFilterSidebar from './IsolationFilterSidebar'
import strainService from '@/features/strain/strainService'
import IsolationNavigation from './IsolationNavigation'
import { useBlocker } from 'react-router-dom'

function getStrains() {
  const { toast } = useToast()

  const { data, isPending, isFetching, isError } = useQuery({
    queryFn: () => strainService.getAllStrains(),
    queryKey: ["strains"],
    onError: (error) => {
      console.log(error)
    },
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

const IsolationSourcePage = () => {
  const strains = getStrains()
  const data = useMemo( () => strains ?? [], [strains])

  const [openTable, setOpenTable] = useState(true)
  const toggleOpenTable = () => setOpenTable((cur) => !cur);

  const [openMap, setOpenMap] = useState(false)
  const toggleOpenMap = () => setOpenMap((cur) => !cur);

  const [openMetrics, setOpenMetrics] = useState(false)
  const toggleOpenMetrics = () => setOpenMetrics((cur) => !cur);

  const [ filter, setFilter ] = useState([])
  const handleSetFilter = (f) => {
    setFilter([f])
    console.log(f)
  }

  

  return (
    <>
      <Header />
      
      <div className='container relative'>
        <div className="rounded-[0.5rem] border bg-background/25 shadow mt-5">
          {/* <div className='grid lg:grid-cols-4'> */}
          <div className='flex'>
            {/* <div className=' col-span-1 hidden'>
              <IsolationFilterSidebar />
            </div> */}
            
            <div className='col-span-3 lg:border-l flex flex-col flex-grow space-y-1 z-0 min-h-screen'>
              {/* <IsolationMap /> */}
              {/* <div className='h-screen'></div> */}
              <IsolationNavigation toggleOpenTable={toggleOpenTable} toggleOpenMap={toggleOpenMap} toggleOpenMetrics={toggleOpenMetrics} />

              <Collapsible
                open={openMap}
                onOpenChange={setOpenMap}
              >
                <CollapsibleContent>
                  <IsolationMap data={data} handleSetFilter={handleSetFilter} />
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={openTable}
                onOpenChange={setOpenTable}
              >
                <CollapsibleContent>
                  <div className='mx-5'>
                    <DataTable data={data} columns={isolation_columns} visible_columns={visible_isolation_columns} column_filter={filter} />
                  </div>
                  {/* <DataTable table={table} columns={isolation_columns} visible_columns={visible_isolation_columns}/> */}
                </CollapsibleContent>
              </Collapsible>
             
              <Collapsible
                open={openMetrics}
                onOpenChange={setOpenMetrics}
              >
                <CollapsibleContent>
                  Hello
                  <div className='h-screen' />
                </CollapsibleContent>
              </Collapsible>

              {
                (openTable || openMap || openMetrics) === false ?
                // (<></>) :
                (<div className='flex items-center justify-center text-muted-foreground'>No selected tab</div>)
                : null
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IsolationSourcePage