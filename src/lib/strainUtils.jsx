import { sample_type } from "@/constants"

export function generateFullAccessionCode(strain) {
  const valueContainer = []
  
  const sample_type_code = sample_type.find( (item) => { return item.value == strain.sample_type }).code

  strain.collection_name != '' ? valueContainer.push(strain.collection_name.toUpperCase()) : null
  strain.institution != '' ? valueContainer.push(strain.institution.toUpperCase()) : null
  strain.project_code != '' ? valueContainer.push(strain.project_code.toUpperCase()) : null
  strain.location_abbr != '' ? valueContainer.push(strain.location_abbr.toUpperCase()) : null
  strain.sampling_site_abbr != '' ? valueContainer.push(strain.sampling_site_abbr) : null
  // strain.sampling_site != '' ? valueContainer.push(strain.sampling_site) : null
  strain.sampling_point != '' ? valueContainer.push(strain.sampling_point.toUpperCase()) : null
  // strain.type_description_code != '' ? valueContainer.push(strain.type_description_code) : null
  strain.host_type != '' ? valueContainer.push(strain.host_type.toUpperCase()) : null
  strain.sample_type != '' ? valueContainer.push(sample_type_code) : null
  strain.custom_code != '' ? valueContainer.push(strain.custom_code.toUpperCase()) : null
  strain.isolate_id != '' ? valueContainer.push(strain.isolate_id) : null

  return valueContainer.join('-')
}