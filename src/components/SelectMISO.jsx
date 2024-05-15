import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { category_1, category_2, category_3 } from "@/constants/miso"


export function ComboboxPopover({data, title, handleCategoryChange}) {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

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
            <CommandInput placeholder="Change value..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {data.map(item => (
                  <CommandItem
                    key={item.name+item.id}
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

const SelectMISO = () => {
  const [category2List, setCategory2List] = useState(category_2)
  const [category3List, setCategory3List] = useState(category_3)

  const handleCategory1Change = (category) => {
    setCategory2List(category_2.filter((item) => { return item.cat1_code === category.cat1_code }))
    setCategory3List(category_3.filter((item) => { return item.cat1_code === category.cat1_code }))
  }

  const handleCategory2Change = (category) => {
    // setCategory2List(category_2.filter((item) => { return item.cat1_code === category.cat1_code }))
    setCategory3List(category_3.filter((item) => { return item.cat2_code === category.cat2_code }))
  }

  return (
    // <div className="grid lg:grid-cols-6 gap-x-4 gap-y-2 sm:grid-cols-1">
    <>
      <div className="lg:col-span-2 sm:col-span-full">
        <ComboboxPopover data={category_1} title={'Set Category 1'} handleCategoryChange={handleCategory1Change} />
      </div>
      <div className="lg:col-span-2 sm:col-span-full">
        <ComboboxPopover data={category2List} title={'Set Category 2'} handleCategoryChange={handleCategory2Change} />
      </div>
      <div className="lg:col-span-2 sm:col-span-full">
        <ComboboxPopover data={category3List} title={'Set Category 3'} />
      </div>
    </>  
    // </div>
  )
}

export default SelectMISO