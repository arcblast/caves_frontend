import SelectMISO from '@/components/SelectMISO'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const StrainForm = () => {
  return (
    <div className='grid lg:grid-cols-6 sm:grid-cols-1 w-full items-center gap-x-4 gap-y-2'>

      <h4 className='text-primary font-semibold col-span-full'>Strain Identifiers</h4>

      <div className="col-span-3">
      	<Label htmlFor="custom_id">Custom ID</Label>
        <Input name='custom_id' id="custom_id" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="isolate_id">Isolate ID</Label>
        <Input name='isolate_id' id="isolate_id" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="collection">Collection</Label>
        <Input name='collection' id="collection" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="institution">Institution</Label>
        <Input name='institution' id="institution" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="project_name">Project name</Label>
        <Input name='project_name' id="project_name" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="project_code">Project code</Label>
        <Input name='project_code' id="project_code" />
      </div>

      <Separator className='col-span-full my-4' />

			<h4 className='text-primary font-semibold col-span-full'>Name and Taxonomic Classification</h4>

      <div className="col-span-full">
      	<Label htmlFor="strain_name">Strain name</Label>
        <Input name='strain_name' id="strain_name" />
      </div>

			<div className="col-span-full">
      	<Label htmlFor="scientific_name">Scientific name</Label>
        <Input name='scientific_name' id="scientific_name" />
      </div>

			<div className="col-span-3">
      	<Label htmlFor="domain">Domain</Label>
        <Input name='domain' id="domain" />
      </div>

			<div className="col-span-3">
      	<Label htmlFor="phylum">Phylum</Label>
        <Input name='phylum' id="phylum" />
      </div>

			<div className="col-span-3">
      	<Label htmlFor="class_name">Class</Label>
        <Input name='class_name' id="class_name" />
      </div>

			<div className="col-span-3">
      	<Label htmlFor="order">Order</Label>
        <Input name='order' id="order" />
      </div>

			<div className="col-span-3">
      	<Label htmlFor="family">Family</Label>
        <Input name='family' id="family" />
      </div>

			<div className="col-span-3">
      	<Label htmlFor="genus">Genus</Label>
        <Input name='genus' id="genus" />
      </div>

			<div className="col-span-3">
      	<Label htmlFor="species">Species</Label>
        <Input name='species' id="species" />
      </div>

      <Separator className='col-span-full my-4' />

			<h4 className='text-primary font-semibold col-span-full'>Isolation, Sampling, and Environmental Information</h4>

      <div className="col-span-3">
      	<Label htmlFor="isolate_id">Isolate ID</Label>
        <Input name='isolate_id' id="isolate_id" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="sample_type">Sample type</Label>
        <Input name='sample_type' id="sample_type" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="host_type">Host type</Label>
        <Input name='host_type' id="host_type" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="host_species">Host species</Label>
        <Input name='host_species' id="host_species" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="sampling_site">Cave name/Sampling site</Label>
        <Input name='sampling_site' id="sampling_site" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="sampling_point">Sampling point</Label>
        <Input name='sampling_point' id="sampling_point" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="municity">Municipality/City</Label>
        <Input name='municity' id="municity" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="province">Province</Label>
        <Input name='province' id="province" />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="location_latitude">Location latitude</Label>
        <Input name='location_latitude' id="location_latitude" type='number' />
      </div>

      <div className="col-span-3">
      	<Label htmlFor="location_longitude">Location longitude</Label>
        <Input name='location_longitude' id="location_longitude" type='number' />
      </div>

      <div className="col-span-full">
      	<Label htmlFor="location_information">Other isolation source information</Label>
        <Input name='other_information' id="other_information" />
      </div>

      {/* <div className='col-span-full'> */}
        <Label htmlFor="miso_categories" className='col-span-full mt-2'>MISO categories</Label>
        <SelectMISO />
      {/* </div> */}
      {/* <SelectMISO /> */}

    </div>
  )
}

export default StrainForm