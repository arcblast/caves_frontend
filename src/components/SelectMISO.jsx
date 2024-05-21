import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { category_1, category_2, category_3 } from "@/constants/miso"
import { ArrowBigUp, PlusCircleIcon } from "lucide-react"


export function ComboboxPopover({data, title, handleCategoryChange, selectedValue, setSelectedValue}) {
  const [open, setOpen] = useState(false)
  // const [selectedValue, setSelectedValue] = useState('')

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start font-normal"
          >
            {selectedValue ? (
              <>
                {selectedValue}
              </>
            ) : (
              title
            )}
          </Button>
          {/* <Input placeholder='Set status' /> */}
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandInput placeholder="Set a category..." />
            <CommandList>
              <CommandEmpty value={''}>No results found.</CommandEmpty>
              <CommandGroup>
                {data.map(item => (
                  <CommandItem
                    key={'miso'+item.name+item.id}
                    value={item.name}
                    onSelect={name => {
                      setSelectedValue(name
                        // statuses.find(priority => priority.value === value) ||
                        //   ''
                      )
                      setOpen(false)
                      handleCategoryChange(item)
                    }}
                    className={item.color_code}
                  >
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

const SelectMISO = ({handleMISOChange}) => {
  const [category1, setCategory1] = useState('')
	const [category2, setCategory2] = useState('')
	const [category3, setCategory3] = useState('')
  const [category2List, setCategory2List] = useState(category_2)
  const [category3List, setCategory3List] = useState(category_3)

  const handleCategory1Change = (category) => {
    setCategory1(category.name)
    setCategory2('')
    setCategory3('')
    setCategory2List(category_2.filter((item) => { return item.cat1_code === category.cat1_code }))
    setCategory3List(category_3.filter((item) => { return item.cat1_code === category.cat1_code }))
  }

  const handleCategory2Change = (category) => {
    setCategory2(category.name)
    setCategory3('')
    // setCategory2List(category_2.filter((item) => { return item.cat1_code === category.cat1_code }))
    setCategory3List(category_3.filter((item) => { return item.cat2_code === category.cat2_code }))
  }

  const handleCategory3Change = (category) => {
    setCategory3(category.name)
  }

  return (
    <>
      <div className="lg:col-span-3 sm:col-span-full">
        <ComboboxPopover data={category_1} title={'Category 1'} handleCategoryChange={handleCategory1Change} selectedValue={category1} setSelectedValue={setCategory1} />
      </div>
      <div className="lg:col-span-3 sm:col-span-full">
        <ComboboxPopover data={category2List} title={'Category 2'} handleCategoryChange={handleCategory2Change} selectedValue={category2} setSelectedValue={setCategory2} />
      </div>
      <div className="lg:col-span-3 sm:col-span-full">
        <ComboboxPopover data={category3List} title={'Category 3'} handleCategoryChange={handleCategory3Change} selectedValue={category3} setSelectedValue={setCategory3} />
      </div>
      <div className="lg:col-span-1 grid justify-items-end">
        <Button
          type='button'
          variant='ghost'
          className=' underline mr-1'
          disabled={category1 == '' && category2 == '' && category3 == ''}
          onClick={ () => {
            // if( category1 != '' && category2 != '' && category3 != '' ) {
              handleMISOChange([category1,category2,category3])
              setCategory1('')
              setCategory2('')
              setCategory3('')
              setCategory2List(category_2)
              setCategory3List(category_3)
            // }
          }}
        >
          Add/Save
        </Button>
      </div>
    </>  
  )
}

export default SelectMISO