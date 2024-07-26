import SelectMISO from '@/components/SelectMISO'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { sample_type as sampletype } from '@/constants'
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { muncities, provinces } from '@/constants/municity_province'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateFullAccessionCode } from '@/lib/strainUtils'

const StrainSchema = z.object({
  custom_code: z.string(),
  isolate_id: z.string(),
  collection_name: z.string({ required_error: 'This field is required.' }),
  institution: z.string({ required_error: 'This field is required.' }),
  project_name: z.string({ required_error: 'This field is required.' }),
  project_code: z.string({ required_error: 'This field is required.' }),

  strain_name: z.string(),
  scientific_name: z.string(),
	domain: z.string(),
	phylum: z.string(),
	class_name: z.string(),
	order: z.string(),
	family: z.string(),
	genus: z.string(),
	species: z.string(),

		// antibiotic_resistance_profile:z.string(),
		// cell_shape:z.string(),
		// endospore_forming_capability:z.string(),
		// gram_stain:z.string(),
		// motility:z.string(),
		// oxygen_tolerance:z.string(),
		// presence_of_cytochrome_c_oxidase:z.string(),

  type_description: z.string(),
  sample_type: z.string(),
  host_type: z.string(),
	host_species: z.string(),
	sampling_site: z.string(),
	sampling_point: z.string(),
  sampling_site_abbr: z.string(),
  // city_province: z.string(),
  municity: z.string(),
  province: z.string(),
  location_abbr: z.string(),
  location_latitude: z.coerce.number(),
	location_longitude: z.coerce.number(),
  sampling_date: z.coerce.date(),
  storage_information: z.string(),
  location_information: z.string(),

  status: z.string(),
  hide: z.boolean()
})

const StrainForm = ({ title, defaultValue, handleAction, misocategories }) => {
  const form = useForm({
    resolver: zodResolver(StrainSchema),
    defaultValues: defaultValue,
  })

  const { toast } = useToast()
  const navigate = useNavigate()


  const [ miso_categories, setMisoCategory] = useState(misocategories)
	const handleMISOChange = (misoData) => {
    setMisoCategory([...miso_categories, misoData])
    console.log(misoData)
	}

  function onSubmit(data) {
    console.log(data)
    try {
      const strainData = {
        ...data,
        miso_categories: miso_categories,
        miso_categories_string: miso_categories.toString(),
        full_accession_code: generateFullAccessionCode(data)
      }
      console.log(strainData)
      handleAction(strainData)
      navigate('/strain-collection')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: {error},
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-6 gap-x-4 gap-y-2 font-inter'>

        <h4 className='text-primary font-bold text-base col-span-full'>Strain Identifiers</h4>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="custom_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source Custom ID</FormLabel>
                <FormControl>
                  <Input placeholder="FULL-ACCESSION-CODE-[SOURCE_ID]-00X" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="isolate_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Isolate ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. B1|001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="collection_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. MCC-UPLB" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. MNH" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="project_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. NICER CAVES" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="project_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project code</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. CAVES" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className='col-span-full my-4' />

        <h4 className='text-primary font-bold text-base col-span-full'>Name and Taxonomic Classification</h4>

        <div className='col-span-full'>
          <FormField
            control={form.control}
            name="strain_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strain name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Abditibacterium utsteinense Tahon et al. 2018" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="phylum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phylum</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="class_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="family"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Family</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="genus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genus</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="species"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Species</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Abditibacterium utsteinense" className='italic' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className='col-span-full my-4' />

			  <h4 className='text-primary font-bold text-base col-span-full'>Isolation, Sampling, and Environmental Information</h4>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="type_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type description</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. Bacteria | Yeasts | Molds' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="sample_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sample type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} >
                  <FormControl>
                    <SelectTrigger className='bg-background'>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      { sampletype.map( ({name, value}) => (
                        <SelectItem key={value} value={value}>{name}</SelectItem>
                      ))} 
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="host_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host type</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. Bat' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="host_species"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host species</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. Rhinolophus arcuatus' className='italic' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="sampling_site"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sampling site/Cave name</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. Cavinti Underground River and Cave Complex' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-2'>
          <FormField
            control={form.control}
            name="sampling_site_abbr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sampling site abbreviation</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. CURCC' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-1'>
          <FormField
            control={form.control}
            name="sampling_point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sampling point</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. 1' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-2'>
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} className='font-inter'>
                  <FormControl>
                    <SelectTrigger className='bg-background'>
                      <SelectValue placeholder='Select province' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='font-inter'>
                    <SelectGroup>
                      { provinces.map( ({province, index}) => (
                        <SelectItem key={'strain-form'+province+index} value={province}>{province}</SelectItem>
                      ))} 
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <div className='col-span-3'>
          <FormField
            control={form.control}
            name="municity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Municipality/City</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} >
                  <FormControl>
                    <SelectTrigger className='bg-background'>
                      <SelectValue placeholder='Select municipality' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      { muncities.filter(item => item.province == form.province).map( ({muncity, index}) => (
                        <SelectItem key={'strain-form'+muncity+index} value={muncity}>{muncity}</SelectItem>
                      ))} 
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        <div className='col-span-2'>
          <FormField
            control={form.control}
            name="municity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Municipality/City</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. Cavinti' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-2'>
          <FormField
            control={form.control}
            name="location_abbr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location abbreviation/code</FormLabel>
                <FormControl>
                  <Input placeholder='e.g. CL' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

          {/* <div className='col-span-3'>
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

        <div className='col-span-2'>
          <FormField
            control={form.control}
            name="location_latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location latitude</FormLabel>
                <FormControl>
                  <Input type='number' inputmode='decimal' step='0.01' placeholder={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-2'>
          <FormField
            control={form.control}
            name="location_longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location longitude</FormLabel>
                <FormControl>
                  <Input type='number' inputmode='decimal' step='0.01' placeholder={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

         <div className='col-span-2'>
          <FormField
            control={form.control}
            name="sampling_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sampling date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-full'>
          <Label className='col-span-full mt-1'>MISO categories</Label>
          { miso_categories.length != 0 ?
            miso_categories.map((item, index) =>
              <Badge variant='secondary' className='inline text-xs'>
                {item.toString()}
                <Button
                  type='button'
                  variant='ghost'
                  className='h-1 w-2 items-center text-destructive hover:bg-disable'
                  onClick={() => {
                    const newArray = [...miso_categories.slice(0, index),...miso_categories.slice(index+1)]
                    setMisoCategory(newArray)
                  }}
                >x</Button>
              </Badge>) 
            : null
          }
          <div className='grid grid-cols-10 lg:space-x-2 lg:space-y-0 sm:space-y-2 mt-2'>
            <SelectMISO handleMISOChange={handleMISOChange} />
          </div>
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="storage_information"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage information</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-3'>
          <FormField
            control={form.control}
            name="location_information"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other isolation source information and history</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Separator className='col-span-full my-4' />

        <h4 className='text-primary font-bold text-base col-span-full'>Others</h4>

        <div className='col-span-2'>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} >
                  <FormControl>
                    <SelectTrigger className='bg-background'>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='font-inter'>
                    <SelectGroup>
                      <SelectItem key='completed-status' value='Completed'>Completed</SelectItem>
                      <SelectItem key='inprogress-status' value='Data input in progress'>Data input in progress</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='col-span-2'>
          <FormField
            control={form.control}
            name="hide"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between px-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm">
                      Privacy
                    </FormLabel>
                    <FormDescription>
                      Hide these information from public.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        </div>

        <div className='col-span-full space-x-4 mt-5'>
          <Button type='submit' >{title}</Button>
          <Button type='button' variant='outline' onClick={() => navigate('/strain-collection')} >Cancel</Button>
        </div>
      </form>
    </Form>
  )
}

export default StrainForm