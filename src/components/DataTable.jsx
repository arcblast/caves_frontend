import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';


// import { AccordionDemo } from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
// import * as Accordion from '@radix-ui/react-accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useMemo, useState } from "react"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import TableToolbar from "./table/TableToolbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useSelector } from "react-redux"



export function DataTable({data, columns, visible_columns, column_filter,user_level}) {

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState(visible_columns)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [dialogOpen,setDialogOpen] = useState(false)
  const [selectedIsolate,setSelectedIsolate] =useState({}||null);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter
    }
  })

  useEffect(() => {
    setColumnFilters(column_filter)
  
  }, [column_filter])
  
  const HandleIsolateDialog = (value) => {
   
    if(user_level!='ADMIN'){
      setSelectedIsolate(value.original)
    
      setDialogOpen(true);
      // console.log("USER LEVEL ",user_level)
      console.log("Isolate ",value.original)
    }

  }
 
const AccordionItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={classNames(
      'focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_0px]',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={classNames(
        'text-violet11 shadow-mauve6  hover:bg-gray-100 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDown className="ml-2 h-4 w-4" />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      'text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
));


  return (
    <>
      <div>
        
      </div>
      <div className="flex items-center pt-4 pb-2 font-inter justify-between">
        <Input
          placeholder="Search strains..."
          value={globalFilter ?? ''}
          onChange={event => {
            setGlobalFilter(event.target.value)
            }
          }
          className="max-w-sm mr-2"
        />
        {/* <Input
          placeholder="Search strains..."
          value={table.getColumn("miso_categories")?.getFilterValue() ?? ""}
          onChange={event =>
            table.getColumn("miso_categories")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto bg-background/50">
              View Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className='font-inter'>
            <ScrollArea className='h-72'>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                const { name } = column.columnDef.meta ?? {}
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {/* {column.id} */}
                    { name ?? column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
              </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-4">
        <TableToolbar table={table} />
      </div>

      <ScrollArea className=" w-auto">
        <div className="rounded-md border">
          <Table className='bg-background/50 font-inter'>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className='hover:bg-white cursor-pointer'
                    onClick={()=>HandleIsolateDialog(row)}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell className='p-3' key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 py-4 font-inter">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-muted-foreground">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px] bg-background.50 ">
              <SelectValue placeholder={table.getState().pagination.pageSize}/>
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`} className='font-inter'>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-x-2 flex items-center">
          <div className="text-sm text-muted-foreground">
            Page {' '} {table.getState().pagination.pageIndex+1}{' '} of {' '}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        </div>
      </div>
       {/* POPUP WINDOW START */}
      {dialogOpen && selectedIsolate && 
        <>        
       <div class="flex justify-center overflow-scroll ">      
       <Dialog open={dialogOpen}  onOpenChange={setDialogOpen} class=''>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px] overflow-y-scroll md:h-4/6  scrollbar-width: none;">
        <DialogHeader>
          <DialogTitle class="align-center">Detailed Information</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>

        <div className="grid ">
          
        {selectedIsolate.status == "Data input in progress" &&
        <div className="flex justify-left items-center mb-2">
          
          <p className='font-medium text-green-1000'>Status: </p>
          <h4 className="col-span-2  text-green-500 font-semibold"> &nbsp; Data input in progress</h4>
        </div>
          
        }

          <div className="grid grid-cols-4   items-center gap-x-4 gap-y-1">


       
           {/* ACCORDION*/}
        <Accordion.Root
          className=" w-full rounded-sm col-span-4"
          type="multiple"
          defaultValue={["item-1","item-2","item-3","item-4","item-5"]}
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h3 className="col-span-4 text-left text-green-950 font-semibold">Taxonomic Information</h3>
            </AccordionTrigger>
            <AccordionContent className>
            <div className="w-full col-span-4 display:inline-block">
              <div>
              <p className='col-span-1 text-left'>Accession Number</p>
                </div>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.accession_number}
                className="col-span-3"
              />
            </div>
              <Label htmlFor="name" className="col-span-1 text-right">
                Scientific Name
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.scientific_name}
                className="col-span-3"
              />

              <Label htmlFor="name" className="col-span-1 text-right">
                Species
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.species}
                className="col-span-3"
                />
              <Label htmlFor="name" className="col-span-1 text-right">
                Host Type
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.host_type}
                className="col-span-3"
              />
              <Label htmlFor="name" className="col-span-1 text-right">
                Host Species
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.host_species
                }
                className="col-span-3"
              />
              <Label htmlFor="name" className="col-span-1 text-right">
                Domain
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.type_description}
                className="col-span-3"
                />
                       <Label htmlFor="name" className="col-span-1 text-right">
                Phylum
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.phylum}
                className="col-span-3"
                />
                           <Label htmlFor="name" className="col-span-1 text-right">
                Class
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.class}
                className="col-span-3"
                />
              <Label htmlFor="name" className="col-span-1 text-right">
                Order
              </Label>
              <Input
                id="name" disabled defaultValue={selectedIsolate.order}
                className="col-span-3"
              />
              <Label htmlFor="Family" className="col-span-1 text-right">
                Family
              </Label>
              <Input
                id="name" disabled defaultValue={selectedIsolate.family}
                className="col-span-3"
              />
              <Label htmlFor="name" className="col-span-1 text-right">
                Genus
              </Label>
              <Input
                id="name" disabled defaultValue={selectedIsolate.genus}
                className="col-span-3"
              />
              
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>

            <h3 className="col-span-4 text-left text-green-950 font-semibold">Source</h3>
            </AccordionTrigger>
            <AccordionContent>
      
            <Label htmlFor="name" className="col-span-1 text-right">
              Sampling Site
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={selectedIsolate.sampling_site+' , '+selectedIsolate.municity+' , '+selectedIsolate.province}
              className="col-span-3"
              />
            <Label htmlFor="name" className="col-span-1 text-right ">
              Sample Type
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={selectedIsolate.sample_type}
              className="col-span-3"
              />
            <Label htmlFor="name" className="col-span-1 text-right">
              Type
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={selectedIsolate.type_description}
              className="col-span-3"
              />

            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
            <h3 className="col-span-4 text-left text-green-950 font-semibold">Morphology</h3>
            </AccordionTrigger>
            <AccordionContent>
            <Label htmlFor="name" className="col-span-1 text-right">
              Cell Shape
            </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.cell_shape}
                className="col-span-3"
                />
                        <Label htmlFor="name" className="col-span-1 text-right">
                Gram Stain
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.gram_stain}
                className="col-span-3"
                />
              <Label htmlFor="name" className="col-span-1 text-right">
                Motility
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.motility}
                className="col-span-3"
                />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
            <h3 className="col-span-4 text-left text-green-950 font-semibold">Physiology and Metabolism</h3>
            </AccordionTrigger>
            <AccordionContent>
              <Label htmlFor="name" className="col-span-1 text-right">
                Antibiotic Resistance Profile
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.antibiotic_resistance_profile}
                className="col-span-3"
                />
                <Label htmlFor="name" className="col-span-1 text-right">
                Oxygen Tolerance
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.oxygen_tolerance}
                className="col-span-3"
                />
              <Label htmlFor="name" className="col-span-1 text-right">
                Endospore-forming Capability
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.endospore_forming_capability}
                className="col-span-3"
                />
                <Label htmlFor="name" className="col-span-1 text-right">
                Presence of Cytochrome c Oxidase
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={'Oxidase Negative'}
                className="col-span-3"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
            <h3 className="col-span-4 text-left text-green-950 font-semibold">Safety Information</h3>
            </AccordionTrigger>
            <AccordionContent>
              <Label htmlFor="name" className="col-span-1 text-right">
                Pathogenicity (Human)
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={''}
                className="col-span-3"
                />
              
            </AccordionContent>
          </AccordionItem>
        </Accordion.Root>

     {/*Accordion END */}
       

            {/* <div className='col-span-4'>
              <h3 className="col-span-4 text-left text-green-950 font-semibold">Taxonomic Information</h3>
  

              <Label htmlFor="name" className="col-span-1 text-left">
                Strain Name
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.strain_name}
                className="col-span-"
              />

       
              </div> */}
              
          </div>
           {/* <Label htmlFor="name" className="col-span-1 text-right">
                Scientific Name
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.scientific_name}
                className="col-span-3"
              />
              <Label htmlFor="name" className="col-span-1 text-right">
                Species
              </Label>
              <Input
                id="name"
                disabled
                defaultValue={selectedIsolate.scientific_name}
                className="col-span-3"
                /> */}
          <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
            {/* <h3 className="col-span-4 text-left text-green-950 font-semibold pt-2">Sample Source</h3>
            <Label htmlFor="name" className="col-span-1 text-right">
              Sampling Site
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={selectedIsolate.sampling_site+' , '+selectedIsolate.municity+' , '+selectedIsolate.province}
              className="col-span-3"
              />
            <Label htmlFor="name" className="col-span-1 text-right ">
              Sample Type
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={selectedIsolate.sample_type}
              className="col-span-3"
              />
            <Label htmlFor="name" className="col-span-1 text-right">
              Type
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={selectedIsolate.type_description}
              className="col-span-3"
              />
    
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <h3 className="col-span-4 text-left text-green-950 font-semibold pt-2">Morphology</h3>
            <Label htmlFor="name" className="col-span-1 text-right">
              Cell Shape
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={selectedIsolate.cell_shape}
              className="col-span-3"
              />
                       <Label htmlFor="name" className="col-span-1 text-right">
              Gram Stain
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={selectedIsolate.cell_shape}
              className="col-span-3"
              />
            <Label htmlFor="name" className="col-span-1 text-right">
              Motility
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={selectedIsolate.cell_shape}
              className="col-span-3"
              />
          </div>     
          <div className="grid grid-cols-4 items-center gap-2">
            <h3 className="col-span-4 text-left text-green-950 font-semibold pt-2">Physiology and Metabolism</h3>
            <Label htmlFor="name" className="col-span-1 text-right">
              Antibiotic Resistance Profile
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={''}
              className="col-span-3"
              />
    
          </div>   
          <div className="grid grid-cols-4 items-center gap-2">
            <h3 className="col-span-4 text-left text-green-950 font-semibold pt-2">Safety Information</h3>
            <Label htmlFor="name" className="col-span-1 text-right">
              Pathogenicity (Human)
            </Label>
            <Input
              id="name"
              disabled
              defaultValue={''}
              className="col-span-3"
              /> */}
              
          </div>   
        </div>
        <DialogFooter>
          <Button className="bg-green-800"  type="submit" onClick={()=>setDialogOpen(false)}>Return to table</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            </div> 
            
        </>
      }   

    </>
  )
}
