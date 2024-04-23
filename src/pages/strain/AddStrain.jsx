import React, { useState } from 'react'
import StrainForm from './StrainForm'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const AddStrain = () => {
	const [ open, setOpen ] = useState(false)
	const handleOpen = () => setOpen(!open)

  return (
    <>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>Add strain</Button>
				</DialogTrigger>
				<DialogContent className='mx-auto max-w-screen-md h-3/4'>
					<DialogHeader>
						<DialogTitle className='text-xl'>Add strain</DialogTitle>
						<DialogDescription>
							Provide the strain information below.
						</DialogDescription>
						<Separator />
					</DialogHeader>
					<div className='m-2 p-2 overflow-y-auto'>
						<StrainForm />
					</div>
					<DialogFooter>
						<Button variant='secondary' onClick={handleOpen} >Cancel</Button>
						<Button>Add Strain</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
  )
}

export default AddStrain