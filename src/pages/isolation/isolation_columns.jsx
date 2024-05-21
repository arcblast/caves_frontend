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
    accessorKey: "custom_id",
    header: "CustomID",
    meta: {
      name: "Custom ID",
    },
    cell: ({ row }) => (
      <div>000</div>
    )
  },
	{
		accessorKey: "strain_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Strain name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: "Strain name",
    },
    cell: ({ row }) => <div className="text-xs">{row.getValue("strain_name")}</div>,
    enableHiding: false
	},
  {
    accessorKey: "sampling_site",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sampling site
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: "Sampling site",
    },
    cell: ({ row }) => <div className="text-xs">{row.getValue("sampling_site")}</div>
  },
  {
    accessorKey: "sampling_point",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sampling point
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: "Sampling point",
    },
    cell: ({ row }) => <div className="text-xs">{row.getValue("sampling_point")}</div>
  },
	{
    accessorKey: "sample_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // onClick={() => column.getToggleSortingHandler()}
        >
          Sampling type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: "Sample type",
    },
    cell: ({ row }) => <div className="text-xs">{row.getValue("sample_type")}</div>
  },
	{
    accessorKey: "city_province",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta:{
      name: "City/Province",
    },
    cell: ({ row }) => <div className="text-xs">{row.getValue("city_province")}</div>
  },
  {
    accessorKey: "miso_categories",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          MISO
        </Button>
      )
    },
    meta: {
      name: "MISO categories",
    },
    cell: ({ row }) =>
      <div className="space-y-1 space-x-0.5 flex flex-col">
        {
          // row.getValue("miso_categories").length != 0 ? (
          //   row.getValue("miso_categories")?.map( miso => {
              <p>{row.getValue("miso_categories")?.toString()}</p>
              // <div className=" flex flex-row space-x-0.5">
              //   <Badge
              //     className={classNames(
              //       miso[0] ? category_1.find( item => { return item.name === miso[0] })?.color_code : null, 'hover:bg-disable justify-center text-foreground font-normal'
              //     )}
              //   >
              //     {miso[0]}
              //   </Badge>
              //   <Badge
              //     className={classNames(
              //       miso[0] ? category_1.find( item => { return item.name === miso[0] })?.color_code : null, 'hover:bg-disable justify-center text-foreground font-normal'
              //     )}
              //   >
              //     {miso[1]}
              //   </Badge>
              //   <Badge
              //     className={classNames(
              //       miso[0] ? category_1.find( item => { return item.name === miso[0] })?.color_code : null, 'hover:bg-disable justify-center text-foreground font-normal'
              //     )}
              //   >
              //     {miso[2]}
              //   </Badge>
              // </div>
          //   })
          // ) : <p>{row.getValue("miso_categories").toString()}</p>
        }
        
      </div>
  },
  // {
  //   header: 'MISO categories',
  //   accessorKey: 'miso_categories',
  //   meta: {
  //     name: "MISO",
  //   },
  //   columns: [
  //     {
  //       id: 'level_1',
  //       cell: ({ row }) =>
  //         <Badge
  //           className={classNames(
  //             row.getValue("miso_categories")[0] ? category_1.find( item => { return item.name === row.getValue("miso_categories")[0] })?.color_code : null, 'hover:bg-disable items-center text-foreground'
  //           )}
  //         >
  //           {row.getValue("miso_categories")[0]}
  //         </Badge>
  //     },
  //     {
  //       id: 'level_2',
  //       cell: ({ row }) =>
  //         <Badge
  //           className={classNames(
  //             row.getValue("miso_categories")[0] ? category_1.find( item => { return item.name === row.getValue("miso_categories")[0] })?.color_code : null, 'hover:bg-disable items-center text-foreground'
  //           )}
  //         >
  //           {row.getValue("miso_categories")[1]}
  //         </Badge>
  //     }
  //   ]
  // },
  {
    id: "actions",
    name: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              // onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export const visible_isolation_columns = {
  strain_name : true,
  sampling_site: true,
  sampling_point: false,
  sample_type: true,
  city_province: true,
}

export const column_filter = [
  // {
  //   id: 'strain_name',
  //   value: 'Ent'
  // },
  // {
  //   id: 'sample_type',
  //   value: 'gut'
  // },
]