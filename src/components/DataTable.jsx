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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
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

export function DataTable({data, columns, visible_columns, column_filter}) {

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
    console.log(value.original)
    // console.log("tyype", typeof(value.original))
    setSelectedIsolate(value.original)
    // console.log("id"+value)
    console.log("Meow")
    console.log(dialogOpen)
    setDialogOpen(true);
  }
 
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
                    className='hover:bg-white cursor-pointer bg-pink-100'
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
      {dialogOpen && selectedIsolate && 
        <>        
       <div class="flex justify-center ">      
       <Dialog open={dialogOpen}  onOpenChange={setDialogOpen} class=''>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px] bg-green-100">
        <DialogHeader>
          <DialogTitle class="align-center">Detailed Information</DialogTitle>
          <DialogDescription>
            Click anywhere or the x button to return. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Strain
            </Label>
            <Input
              id="name"
              defaultValue={selectedIsolate.strain_name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Accession number
            </Label>
            <Input
              id="username"
              defaultValue={selectedIsolate.accession_number}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={()=>setDialogOpen(false)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            </div> 
            
        </>
      }   


    </>
  )
}