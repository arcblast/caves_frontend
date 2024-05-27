import { sample_type } from "@/constants"

export function generateFullAccessionCode(strain) {
  const valueContainer = []
  // function getSampleTypeCode() {
  //   let i;
  //   for()
  // } 
  const sample_type_code = sample_type.find( (item) => { item.value === strain.sample_type })
  console.log(sample_type_code)

  strain.collection_name != '' ? valueContainer.push(strain.collection_name) : null
  strain.institution != '' ? valueContainer.push(strain.institution) : null
  strain.project_code != '' ? valueContainer.push(strain.project_code) : null
  strain.location_abbr != '' ? valueContainer.push(strain.location_abbr) : null
  // strain.sampling_site != '' ? valueContainer.push(strain.sampling_site) : null
  // strain.sampling_site_abbr != '' ? valueContainer.push(strain.sampling_site_code) : null
  strain.sampling_point != '' ? valueContainer.push(strain.sampling_point) : null
  // strain.type_description_code != '' ? valueContainer.push(strain.type_description_code) : null
  // strain.host_type != '' ? valueContainer.push(strain.host_type) : null
  strain.sample_type != '' ? valueContainer.push(strain.sample_type) : null
  strain.custom_code != '' ? valueContainer.push(strain.custom_code) : null
  // strain.isolate_id != '' ? valueContainer.push(strain.isolate_id) : null

  console.log(valueContainer.join('-'))
  return valueContainer.join('-')
}