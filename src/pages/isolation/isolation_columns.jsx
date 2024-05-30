import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { category_1 } from "@/constants/miso"
import { cn } from "@/lib/utils"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const isolation_columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className='-ml-1'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "full_accession_code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Accession Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Full accession code',
    },
    cell: ({ row }) => <div className="">{row.getValue("full_accession_code")}</div>,
  },
  {
    accessorKey: "isolate_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Isolate ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Isolate ID',
    },
    cell: ({ row }) => <div className="">{row.getValue("isolate_id")}</div>,
  },
  {
    accessorKey: "strain_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Strain name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Strain name',
    },
    cell: ({ row }) => <div className="">{row.getValue("strain_name")}</div>,
  },
  {
    accessorKey: "species",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Species
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Species',
    },
    cell: ({ row }) => <div className="">{row.getValue("species")}</div>,
  },
  {
    accessorKey: "type_description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Type description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Type description',
    },
    cell: ({ row }) => <div className="">{row.getValue("type_description")}</div>
  },
  {
    accessorKey: "sample_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Sampling type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Sample type',
    },
    cell: ({ row }) => <div className="">{row.getValue("sample_type")}</div>
  },
  {
    accessorKey: "host_species",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Host
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Host',
    },
    cell: ({ row }) =>
    <div className="flex flex-col">
      <span className="capitalize">{row.original.host_type.toLowerCase()}</span>
      <span className=" italic">{row.getValue("host_species")}</span>
    </div>
  },
  {
    accessorKey: "sampling_site",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Sampling site
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Sampling site',
    },
    cell: ({ row }) => <div className="">{row.getValue("sampling_site")}</div>
  },
  {
    accessorKey: "sampling_point",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Sampling point
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Sampling point',
    },
    cell: ({ row }) => <div className="">{row.getValue("sampling_point")}</div>
  },
  {
    accessorKey: "sampling_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Sampling point
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Sampling date',
    },
    cell: ({ row }) => <div className=""></div>
  },
  {
    accessorKey: "municity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Municipality/City
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Municipality/City',
    },
    cell: ({ row }) => <div className="">{row.getValue("municity")}</div>
  },
  {
    accessorKey: "province",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Location',
    },
    cell: ({ row }) =>
      <div className="flex flex-col">
        <span className="capitalize">{row.original.municity} {row.getValue("province")}</span>
        <span className="text-xs text-muted-foreground">[{row.original.location_latitude?.toFixed(4)} , {row.original.location_longitude?.toFixed(4)}]</span>
      </div>
  },
  {
    accessorKey: "storage_information",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Storage information
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Storage information',
    },
    cell: ({ row }) => <div className="">{row.getValue("storage_information")}</div>
  },
  {
    accessorKey: "location_information",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className='-ml-5'
        >
          Location information
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Location information',
    },
    cell: ({ row }) => <div className="">{row.getValue("location_information")}</div>
  },
  {
    accessorKey: "miso_categories_string",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // className='-ml-5'
        >
          MISO Categories
        </Button>
      )
    },
    meta: {
      name: "MISO categories",
    },
    cell: ({ row }) => {
      // const array = []
      const miso = row.getValue('miso_categories_string')
      // const miso2 = Object.values(row.getValue('miso_categories'))
      // const miso3 = row.getValue('miso_categories')
      const miso3 = row.original.miso_categories

      const displayMISO = (data) => {
        const color = category_1.find( item => { return item.name === data[0] })?.color_code
        return (
          <div className="grid grid-flow-col min-w-max gap-1 m-1">
            <Badge
              className={cn(
                data[0] ? color : null, 'hover:bg-disable justify-center text-foreground font-inter font-normal'
              )}
            >{data[0]}</Badge>
            <Badge
              className={cn(
                data[0] ? color : null, 'hover:bg-disable justify-center text-foreground font-inter font-normal'
              )}
            >{data[1]}</Badge>
            <Badge
              className={cn(
                data[0] ? color : null, 'hover:bg-disable justify-center text-foreground font-inter font-normal'
              )}
            >{data[2]}</Badge>
          </div>
        )
      }

      return (
        <div>
          {
            miso3?.length != 0 ? (
              miso3?.length == 1 ? (
                <>
                  {displayMISO(miso3[0])}
                </>
              ) : (
                <>
                  {
                    miso3.map( item => displayMISO(item))
                  }
                </>
              )
            ) : null
          }
          <p></p>
        </div>
      )
    }
  },
  // {
  //   accessorKey: "miso_categories_string",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         MISO Abbr
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => <div className="">{row.getValue("miso_categories_string")}</div>
  // },
  // {
  //   id: "actions",
  //   name: "Actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             // onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             View
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>Update</DropdownMenuItem>
  //           <DropdownMenuItem>Delete</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   }
  // }
]

export const visible_isolation_columns = {
  full_accession_code: true,
  isolate_id: false,
  scientific_name : true,
  species: false,
  type_description: false,
  sample_type: true,
  host_type: false,
  host_species: false,
  sampling_site: true,
  sampling_point: false,
  sampling_date: false,
  municity: false,
  province: true,
  storage_information: false,
  location_information: false,
  miso_categories: true
}