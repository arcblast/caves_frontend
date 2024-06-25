import React, { useState } from 'react'
import TableFacetedFilter from './TableFacetedFilter'
import { category_1, category_2, category_3 } from '@/constants/miso'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../ui/collapsible'
import { Button } from '../ui/button'
import { Filter, X } from 'lucide-react'
import { getSamplingSiteData } from '@/lib/statUtils'
import { caves } from '@/constants/caves'

const TableToolbar = ({table}) => {
  const [ open, setOpen ] = useState(false)
  const filtered = table?.getState().columnFilters?.length > 0

  const [category2List, setCategory2List] = useState(category_2)
  const [category3List, setCategory3List] = useState(category_3)

  const [ selectedC1, setC1 ] = useState('')
  const [ selectedC2, setC2 ] = useState('')
  const [ selectedC3, setC3 ] = useState('')

  const handleSetC1 = (c1) => {
    setC1(c1.name)
    table.getColumn('miso_categories_string')?.setFilterValue(c1.name)
    setCategory2List(category_2.filter((item) => { return item.cat1_code === c1.cat1_code }))
  }

  const handleSetC2 = (c2) => {
    setC2(c2.name)
    table.getColumn('miso_categories_string')?.setFilterValue(c2.name)
    setCategory3List(category_3.filter((item) => { return item.cat2_code === c2.cat2_code && item.cat1_code === c2.cat1_code }))
  }

  const handleSetC3 = (c3) => {
    setC3(c3.name)
    table.getColumn('miso_categories_string')?.setFilterValue(c3.name)
    // setCategory2List(category_2.filter((item) => { return item.cat1_code === c2.cat1_code }))
  }

  const [ selectedCave, setSelectedCave ] = useState('')
  const handleSetSelectedCave = (cave) => {
    setSelectedCave(cave.name)
    table.getColumn('sampling_site')?.setFilterValue(cave.name)
  }
 
  return (
    <>
      <div className='flex flex-row space-x-2 items-center'>
        <div>
          { table.getColumn('sampling_site') && 
            <TableFacetedFilter
              column={table.getColumn('sampling_site')}
              title='Cave Sites'
              options={caves}
              selectedValue={selectedCave}
              setSelectedValue={handleSetSelectedCave}
            />
          }
        </div>
        <Collapsible
          open={open}
          onOpenChange={setOpen}
        >
          <div className='flex flex-row space-x-2 items-center'>
            <CollapsibleTrigger asChild>
              <Button variant='outline' className='bg-background/50 pl-2'><Filter className='h-4 mr-1' /> MISO</Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-row space-x-2'>
                { table.getColumn('miso_categories_string') &&
                  <TableFacetedFilter
                    column={table.getColumn('miso_categories_string')}
                    title='Category 1'
                    options={category_1}
                    selectedValue={selectedC1}
                    setSelectedValue={handleSetC1}
                  />
                }
                { table.getColumn('miso_categories_string') &&
                  <TableFacetedFilter
                    column={table.getColumn('miso_categories_string')}
                    title='Category 2'
                    options={category2List}
                    selectedValue={selectedC2}
                    setSelectedValue={handleSetC2}
                  />
                }
                { table.getColumn('miso_categories_string') &&
                  <TableFacetedFilter
                    column={table.getColumn('miso_categories_string')}
                    title='Category 3'
                    options={category3List}
                    selectedValue={selectedC3}
                    setSelectedValue={handleSetC3}
                  />
                }
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
        {filtered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              setC1('')
              setC2('')
              setC3('')
              setSelectedCave('')
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </>
  )
}

export default TableToolbar