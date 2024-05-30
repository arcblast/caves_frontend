import { useToast } from "@/components/ui/use-toast";
import strainService from "@/features/strain/strainService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetDataQuery() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useQuery({
    queryFn: () => strainService.getAllStrains(),
    queryKey: ['statData'],
    onError: (error) => {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error
      })
    },
    // initialData: []
  })
}

function objectFormat(data) {
  const formattedData = []

  let item = ''
  for (let item in data ) {
    formattedData.push({ name: item, occurences: data[item] })
  }

  return formattedData
}

export function getSampleTypeData(data) {
  const dataArray = []
  data?.map( item => dataArray.push(item.sample_type))
  const dataCount = dataArray.reduce(
		function (occ, curr) {
			return occ[curr] ?
				++occ[curr] :
				occ[curr] = 1,
			occ
		}, {}
  )
  const result = objectFormat(dataCount)
  return result
}

export function getTypeDescriptionData(data) {
  const dataArray = []
  data?.map( item => dataArray.push(item.type_description))
  const dataCount = dataArray.reduce(
		function (occ, curr) {
			return occ[curr] ?
				++occ[curr] :
				occ[curr] = 1,
			occ
		}, {}
  )
  const result = objectFormat(dataCount)
  return result
}

export function getSamplingSiteData(data) {
  const dataArray = []
  data?.map( item => dataArray.push(item.sampling_site))
  const dataCount = dataArray.reduce(
		function (occ, curr) {
			return occ[curr] ?
				++occ[curr] :
				occ[curr] = 1,
			occ
		}, {}
  )
  const result = objectFormat(dataCount)
  return result
}

export function getProvinceData(data) {
  const dataArray = []
  data?.map( item => dataArray.push(item.province))
  const dataCount = dataArray.reduce(
		function (occ, curr) {
			return occ[curr] ?
				++occ[curr] :
				occ[curr] = 1,
			occ
		}, {}
  )
  const result = objectFormat(dataCount)
  return result
}
