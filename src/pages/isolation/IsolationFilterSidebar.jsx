import SelectMISO from '@/components/SelectMISO'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { sample_type } from '@/constants'
import React, { useState } from 'react'

const IsolationFilterSidebar = () => {
  const [filter, setFilter] = useState([
    // {
    //   id: 'strain_name',
    //   value: ''
    // },
    // {
    //   id: 'sampling_site',
    //   value: ''
    // },
    // {
    //   id: 'sample_type',
    //   value: ''
    // },
    // {
    //   id: 'city_province',
    //   value: ''
    // }
  ]);


  return (
    <>
      <div className=' lg:block h-full sm:hidden'>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">
              Filter Occurences
            </h2>
            <div className="space-y-4">
              <Input name='strain_name' placeholder='Species' className='placeholder:text-zinc-950 bg-transparent' onChange={(e) => {
                setFilter()
              }} />
              <Input name='sampling_site' placeholder='Cave/Sampling site' className='placeholder:text-zinc-950 bg-transparent' />
              <Select name='sample_type'>
                <SelectTrigger className='bg-transparent' >
                  <SelectValue placeholder="Sample type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    { sample_type.map( ({name, value}) => (
                      <SelectItem key={value} value={value}>{name}</SelectItem>
                    ))
                    } 
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input name='city_province' placeholder='Municity/Province' className='placeholder:text-zinc-950 bg-transparent' />
              
              <Separator />

              {/* <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category 1" />
                </SelectTrigger>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category 2" />
                </SelectTrigger>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category 3" />
                </SelectTrigger>
              </Select> */}
              <Label>MISO Categories</Label>
              <SelectMISO />
              

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IsolationFilterSidebar