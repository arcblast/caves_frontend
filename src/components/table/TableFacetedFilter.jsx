import { CheckIcon, PlusCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../ui/command"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"
import { useState } from "react"

const TableFacetedFilter = ({column, title, options, selectedValue, setSelectedValue}) => {
  // const selectedValue = new Set(column?.getFilterValue())
  // const [ selectedValue, setSelectedValue ] = useState(undefined)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-10 border-dashed bg-background' >
          <PlusCircle className='h-4 w-4 mr-2' />
          {title}
          {selectedValue  != '' && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedValue}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {
                options.map( option => {
                  const isSelected = selectedValue

                  return (
                    <CommandItem
                      key={'data-table-filter-'+option.name}
                      onSelect={() => {
                        setSelectedValue(option)

                        // column?.setFilterValue(
                        //   // selectedValue.length ? selectedValue : undefined
                        //   selectedValue
                        // )
                      }}
                    >
                      {/* <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className={cn("h-4 w-4")} />
                      </div> */}
                      <span>{option.name}</span>
                    </CommandItem>
                  )
                })
              }
            </CommandGroup>
            {selectedValue != '' && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      column?.setFilterValue(undefined)
                      setSelectedValue('')
                    }}
                    className="justify-center text-center"
                  >
                    Clear filter
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>

    </Popover>
  )
}

export default TableFacetedFilter