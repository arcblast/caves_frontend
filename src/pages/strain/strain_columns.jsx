import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StrainActions from "./StrainActions";

export const strain_columns = [
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
    accessorKey: "accession_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Accession ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Accession ID',
    },
    cell: ({ row }) => <div className=""></div>,
  },
  {
    accessorKey: "custom_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Custom ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Custom ID',
    },
    cell: ({ row }) => <div className=""></div>,
  },
  {
    accessorKey: "isolate_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Isolate ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Isolate ID',
    },
    cell: ({ row }) => <div className=""></div>,
  },
  {
    accessorKey: "collection",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Collection
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Collection',
    },
    cell: ({ row }) => <div className=""></div>,
  },
  {
    accessorKey: "institution",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Institution
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Institution',
    },
    cell: ({ row }) => <div className=""></div>,
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
    accessorKey: "sample_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
    accessorKey: "host_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Host type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Host type',
    },
    cell: ({ row }) => <div className="">{row.getValue("host_type")}</div>
  },
  {
    accessorKey: "host_species",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Host species
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    meta: {
      name: 'Host species',
    },
    cell: ({ row }) => <div className="">{row.getValue("host_species")}</div>
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
    cell: ({ row }) => <div className="">{row.getValue("sampling_site")}</div>
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
  // {
  //   accessorKey: "city_province",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Location
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => <div className="">{row.getValue("city_province")}</div>
  // },
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
    meta: {
      name: 'Location',
    },
    cell: ({ row }) =>
      <div className="flex flex-col">
        <span className="capitalize">{row.getValue("city_province")}</span>
        <span className="text-xs text-muted-foreground">[{row.original.location_latitude?.toFixed(4)} , {row.original.location_longitude?.toFixed(4)}]</span>
      </div>
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const strain = row.original

      return (
        <>
          <StrainActions strain={strain} />
        </>
      )
    }
  }
];

export const visible_strain_columns = {
  accesion_id: true,
  custom_id: false,
  isolate_id: false,
  collection: false,
  institution: false,

  strain_name : true,
  species: false,
  sample_type: true,
  host_type: false,
  host_species: false,
  sampling_site: true,
  sampling_point: false,
  sampling_date: false,
  city_province: true,
}