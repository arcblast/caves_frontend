import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const IsolationNavigation = ({toggleOpenTable, toggleOpenMap, toggleOpenMetrics}) => {
  return (
    <>
      <div className='w-full py-3 px-4 flex justify-start border-b'>
        <ToggleGroup type='multiple' defaultValue={['table']} >
          <ToggleGroupItem value='table' onClick={toggleOpenTable} className='h-8 px-4'>
            Table
          </ToggleGroupItem>
          <ToggleGroupItem value='map' onClick={toggleOpenMap} className='h-8 px-4'>
            Map
          </ToggleGroupItem>
          <ToggleGroupItem value='metrics' onClick={toggleOpenMetrics} className='h-8 px-4'>
            Metrics
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </>
  )
}

export default IsolationNavigation