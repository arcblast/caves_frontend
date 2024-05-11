import React from 'react'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { GitGraphIcon, MapIcon, PanelRightIcon, PanelRightOpenIcon, PieChartIcon, SheetIcon } from 'lucide-react'
import { Button } from './ui/button'

const IsolationNav = ({toggleOpenSidebar}) => {
  return (
    <div className='mt-4'>
			<ToggleGroup type='multiple' className='justify-end'>
				<ToggleGroupItem value='table' className='text-base'>
					<SheetIcon className='mr-1 h-4' /> Table
				</ToggleGroupItem>
				<ToggleGroupItem value='map' className='text-base'>
					<MapIcon className='mr-1 h-4' /> Map
				</ToggleGroupItem>
				<ToggleGroupItem value='metrics' className='text-base'>
					<PieChartIcon className='mr-1 h-4' /> Metrics
				</ToggleGroupItem>
				<ToggleGroupItem value='filter' onClick={toggleOpenSidebar} className='text-base' defaultPressed >
					<PanelRightOpenIcon className='mr-1 h-4' /> Filter
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
  )
}

export default IsolationNav