import axios from "@/app/axios"

const STRAIN_URL = '/strains/'

const addStrain = async (strainData, token) => {
	const authHeader = {
		headers: {
			'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
		},
	}
  const response = await axios.post(STRAIN_URL, strainData, authHeader)

  if(response.data && (response.data.error == null) ) {
		return response.data
	} else {
		throw new Error(response.data.error)
	}
}

const getAllStrains = async () => {
	const response = await axios.get(STRAIN_URL)

	if(response.data && (response.data.error == null) ) {
		localStorage.setItem( 'strains', JSON.stringify(response.data) )
		return response.data
	} else {
		console.log(response.data.error)
		throw new Error(response.data.error)
	}
}

const getStrainByUser = async (token) => {
	const headerAuth = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.get(STRAIN_URL + '/collection', headerAuth)

	if(response.data && (response.data.error == null) ) {
		localStorage.setItem( 'collection', JSON.stringify(response.data) )
		return response.data
	} else {
		throw new Error(response.data.error)
	}
}

const getStrain = async (id, token) => {
	const headerAuth = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.get(STRAIN_URL + id, headerAuth)

	if(response.data && (response.data.error == null) ) {
		localStorage.setItem( `strain/${id}`, JSON.stringify(response.data) )
		return response.data
	} else {
		throw new Error(response.data.error)
	}
}

const updateStrain = async (strainData, id, token) => {
	const headerAuth = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.put(STRAIN_URL + id, strainData, headerAuth)
	console.log('Response: ' + response)

	if(response.data && (response.data.error == null) ) {
		localStorage.setItem( 'strain', JSON.stringify(response.data) )
		return response.data
	} else {
		throw new Error(response.data.error)
	}
}

const deleteStrain = async (id, token) => {
	const headerAuth = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await axios.delete(STRAIN_URL + id, headerAuth)

	if(response.data && (response.data.error == null) ) {
		localStorage.setItem( 'strain', JSON.stringify(response.data) )
		return response.data
	} else {
		throw new Error(response.data.error)
	}
}

const strainService = {
	addStrain,
	getAllStrains,
	getStrainByUser,
	getStrain,
	updateStrain,
	deleteStrain
}

export default strainService