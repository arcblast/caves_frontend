import Header from '@/components/Header'
import IsolationMap from './IsolationMap'
import { DataTable } from '@/components/DataTable'
import { isolation_columns, visible_isolation_columns } from './isolation_columns'
import { useToast } from '@/components/ui/use-toast'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import strainService from '@/features/strain/strainService'
import IsolationNavigation from './IsolationNavigation'
import { useSelector } from 'react-redux'
import Footer from '@/components/Footer'

function getStrains() {
  const { toast } = useToast()

  const { data, pending, fetching, isError, isLoading } = useQuery({
    queryFn: () => strainService.getAllStrains(),
    queryKey: ["strains"],
    onError: (error) => {
      console.log(error)
    },

  });
  
  if( data == [] ) {
    return toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "No strain found."
    })
  }

  if( pending || fetching || isLoading ) {
    // console.log('Pending')
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
  const { user } = useSelector( (state) => state.auth )
  
  const strains = getStrains()
  const data = useMemo( () => strains ?? [], [strains])
  const [ filteredData, setFilteredData ] = useState(data)

  useEffect(() => {
    try {
      user?.user_level === 'ADMIN' ? setFilteredData(strains) : setFilteredData(strains?.filter(item => item.hide === false))
    } catch (error) {
      setFilteredData([])
    }
  }, [strains])
  

  
  // console.log(filteredData)
  // console.log(strains)

  const [openTable, setOpenTable] = useState(true)
  const toggleOpenTable = () => setOpenTable((cur) => !cur);

  const [openMap, setOpenMap] = useState(false)
  const toggleOpenMap = () => setOpenMap((cur) => !cur);

  // const [openMetrics, setOpenMetrics] = useState(false)
  // const toggleOpenMetrics = () => setOpenMetrics((cur) => !cur);

  const [ filter, setFilter ] = useState([])
  const handleSetFilter = (f) => {
    setFilter([f])
  }

  

  return (
    <>
      <Header />
      
      <div className='container'>
        <div className="rounded-[0.5rem] border bg-background/25 shadow mt-5">
          {/* <div className='grid lg:grid-cols-4'> */}
          {/* <div className='flex'> */}
            {/* <div className=' col-span-1 hidden'>
              <IsolationFilterSidebar />
            </div> */}
            
            <div className='col-span-3 lg:border-l flex flex-col space-y-1'>
             
              <IsolationNavigation toggleOpenTable={toggleOpenTable} toggleOpenMap={toggleOpenMap} />

              <Collapsible
                open={openMap}
                onOpenChange={setOpenMap}
              >
                <CollapsibleContent>
                  <IsolationMap data={strains} handleSetFilter={handleSetFilter} />
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={openTable}
                onOpenChange={setOpenTable}
              >
                <CollapsibleContent>
                  <div className='mx-5'>
                    <DataTable data={filteredData} columns={isolation_columns} visible_columns={visible_isolation_columns} column_filter={filter} />
                  </div>
                </CollapsibleContent>
              </Collapsible>
             
              {/* <Collapsible
                open={openMetrics}
                onOpenChange={setOpenMetrics}
              >
                <CollapsibleContent>
                  Hello
                  <div className='h-screen' />
                </CollapsibleContent>
              </Collapsible> */}

              {
                (openTable || openMap ) === false ?
                (<div className='flex items-center justify-center text-muted-foreground h-screen'>No selected tab</div>)
                : null
              }
            </div>
          {/* </div> */}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default IsolationSourcePage