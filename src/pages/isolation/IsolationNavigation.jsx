import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { BarChartBig, Map, TableProperties } from 'lucide-react'

const IsolationNavigation = ({toggleOpenTable, toggleOpenMap, toggleOpenMetrics}) => {
  return (
    <>
      <div className='w-full py-3 px-4 flex justify-start border-b'>
        <ToggleGroup type='multiple' defaultValue={['table']} >
          <ToggleGroupItem value='table' onClick={toggleOpenTable} className='h-8 pr-4 pl-3 data-[state=on]:text-primary data-[state=on]:font-semibold'>
            <TableProperties className='h-4 mr-1'/>Table
          </ToggleGroupItem>
          <ToggleGroupItem value='map' onClick={toggleOpenMap} className='h-8 pr-4 pl-3 data-[state=on]:text-primary data-[state=on]:font-semibold'>
            <Map className='h-4 mr-1'/>Map
          </ToggleGroupItem>
          <ToggleGroupItem value='metrics' onClick={toggleOpenMetrics} className='h-8 pr-4 pl-3 data-[state=on]:text-primary data-[state=on]:font-semibold'>
            <BarChartBig className='h-4 mr-1'/>Metrics
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </>
  )
}

export default IsolationNavigation