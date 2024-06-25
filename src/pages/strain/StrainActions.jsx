import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { useToast } from '@/components/ui/use-toast'
import strainService from '@/services/strain/strainService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

function useDeleteStrain () {
  const { user } = useSelector( (state) => state.auth )
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (strainID) => strainService.deleteStrain(strainID, user.token),
    onSuccess: () => {
      toast({
        title: "Succesfully deleted strain.",
      })
      queryClient.invalidateQueries({ queryKey: ['collection']})
    },
    initialData: () => queryClient.getQueryData(['collection'])?.find( item => item.id != strainID)
  })
}

const StrainActions = ({strain}) => {
  const [ showDeleteDialog, setShowDeleteDialog ] = useState(false)
  const toggleShowDeleteDialog = () => { setShowDeleteDialog(!showDeleteDialog)}
  const navigate = useNavigate()
  const deleteStrainMutation = useDeleteStrain()

  const handleDelete = (id) => {
    deleteStrainMutation.mutateAsync(id)
    console.log('here')
    setShowDeleteDialog(false)
  }

  return (
    <>
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
            onSelect={() => navigator.clipboard.writeText(strain._id)}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={ () => navigate(`/strain-collection/update/${strain._id}`)}
          >
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className='text-destructive'
          >
            Delete
            {/* <DeleteStrain strain={strain} showDeleteDialog={showDeleteDialog} setShowDeleteDialog={setShowDeleteDialog} /> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={toggleShowDeleteDialog}>
            {/* <AlertDialogTrigger asChild>
              <Button variant='ghost' size='sm' className='text-destructive items-start justify-start p-0 h-5' >Delete</Button>
            </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you wnat to delete {strain.scientific_name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              strain information and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant='destructive'
              onClick={() => {
                // console.log(strain._id)
                handleDelete(strain._id)
                toggleShowDeleteDialog
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default StrainActions