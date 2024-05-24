import { Button } from "@/components/ui/button"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeftCircle } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useSelector } from "react-redux"
import strainService from "@/features/strain/strainService"
import { useToast } from "@/components/ui/use-toast"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import StrainForm from "./StrainForm"

const UpdateStrain = () => {
  const { user } = useSelector( (state) => state.auth )
  const {id} = useParams()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const navigate = useNavigate()

  const { data, isFetching, isPending, isError } = useQuery({
    queryKey: ['strain', id],
    queryFn: () => strainService.getStrain(id, user.token),
    initialData: () => queryClient.getQueryData(['collection'])?.find( item => item.id == id),
  })

  const { mutate, error, pending } = useMutation({
    mutationFn: (updatedStrain) => strainService.updateStrain(updatedStrain, id, user.token),
    onSuccess: () => {
      toast({
        title: "Succesfully updated strain.",
      })

      queryClient.invalidateQueries({ queryKey: ['strain', id]})
    }
  })

  if( isPending || isFetching || pending ) {
    return <LoadingSkeleton />
  }

  if(isError || error ) {
    return toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
    })
  }

  const defaultValue = {
		custom_code: data.custom_code ?? '',
    isolate_id: data.isolate_id ?? '',
    collection_name: data.collection_name ?? '',
    institution: data.institution ?? '',
    project_name: data.project_name ?? '',
    project_code: data.project_code ?? '',

    scientific_name: data.scientific_name ?? '',
		domain: data.domain ?? '',
		phylum: data.phylum ?? '',
		class_name: data.class_name ?? '',
		order: data.order ?? '',
		family: data.family ?? '',
		genus: data.genus ?? '',
		species: data.species ?? '',

    type_description: data.type_description ?? '',
    sample_type: data.sample_type ?? '',
    host_type: data.host_type ?? '',
		host_species: data.host_species ?? '',
    sampling_site: data.sampling_site ?? '',
		sampling_point: data.sampling_point ?? '',
		sampling_date: data.sampling_date ?? new Date().toISOString().substring(0, 10),
    municity: data.municity ?? '',
    province: data.province ?? '',
    // city_province: data.city_province ?? '',
		location_latitude: data.location_latitude ?? 0,
		location_longitude: data.location_longitude ?? 0,
    storage_information: data.storage_information ?? '',
		location_information: data.location_information ?? '',
    // miso_categories: data.miso_categories ?? [],
    status: data.status ?? '',
    hide: data.hide ?? false
	}

  const handleUpdateSubmit = (strainData) => {
    mutate(strainData)
  }

  return (
    <>
      <div className='flex mt-10 mx-8 justify-end'>
        <h1 className='lg:text-3xl text-lg font-bold flex-1'>Strain Collection</h1>
        <Button variant='outline' className='pl-2' onClick={() => navigate('/strain-collection')} >
          <ArrowLeftCircle className='h-4' />
          Cancel
        </Button>
      </div>

      <div className='flex justify-center'>
        <Card className='!bg-background/20 lg:m-4 lg:w-3/4 sm:w-full font-inter' >
          <CardHeader>
            <CardTitle>Update Strain</CardTitle>
            <CardDescription >
              Update the strain information below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StrainForm
              title={'Update Strain'}
              defaultValue={defaultValue}
              handleAction={handleUpdateSubmit}
              misocategories={ data.miso_categories ?? [] }
            />
            {/* <p>{data?.strain_name}</p> */}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default UpdateStrain