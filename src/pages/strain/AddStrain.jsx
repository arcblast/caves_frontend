import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle, PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import strainService from '@/features/strain/strainService'
import { useSelector } from 'react-redux'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { useToast } from '@/components/ui/use-toast'
import StrainForm from './StrainForm'

const AddStrain = () => {
  const { user } = useSelector( (state) => state.auth )
  const { toast } = useToast()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newStrain) => strainService.addStrain(newStrain, user.token),
    onSuccess: () => {
      toast({
        title: "Succesfully added strain.",
      })
      queryClient.invalidateQueries({ queryKey: ['collection']})
      // queryClient.setQueryData(['collection'], (oldStrains) => [...oldStrains, newStrain])
      // navigate('/strain-collection')
    }
  })

  if( isPending ) {
    return <LoadingSkeleton />
  }

  if( isError ) {
    return toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
    })
  }

  const defaultValue = { 
		custom_code: '',
    isolate_id: '',
    collection_name: 'MCC',
    institution: 'MNH',
    project_name: 'DOST NICER CAVES',
    project_code: 'CAVES',

    // strain_name: '', // commented; does not work if required field
    // scientific_name: '',
		domain: '',
		phylum: '',
		class_name: '',
		order: '',
		family: '',
		genus: '',
		species: '',

    type_description: '',
    type_description_code: '',
    sample_type: '',
    sample_type_code: '',
    host_type: '',
		host_species: '',
    sampling_site: '',
		sampling_point: '',
		sampling_date: new Date().toISOString().substring(0, 10),
    municity: '',
    province: '',
    location_abbr: '',
		location_latitude: 0,
		location_longitude: 0,
    storage_information: '',
		location_information: '',

    status: '',
    hide: false
	}


  const handleAddSubmit = (strainData) => {
    mutate(strainData)
  }

  return (
    <>
			<div className='flex mt-10 container justify-end font-inter'>
        <h1 className='lg:text-3xl text-lg font-bold flex-1 text-primary'>Strain Collection</h1>
          <Button variant='outline' className='pl-2' onClick={() => navigate('/strain-collection')} >
            <ArrowLeftCircle className='h-4' />
            Cancel
          </Button>
      </div>

      <div className='flex justify-center'>
        <Card className='!bg-background/20 lg:m-4 lg:w-3/4 sm:w-full font-inter' >
          <CardHeader>
            <CardTitle>Add Strain</CardTitle>
            <CardDescription >
              Provide the strain information below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StrainForm
              title={'Add Strain'}
              defaultValue={defaultValue}
              handleAction={handleAddSubmit} 
              misocategories={[]}
            />
          </CardContent>
        </Card>
      </div>

		</>
  )
}

export default AddStrain