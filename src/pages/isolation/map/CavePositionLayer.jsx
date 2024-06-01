import { caves } from '@/constants/caves'
import { Icon } from 'leaflet'
import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import Cave from '@/assets/caves.svg'

const CavePositionLayer = () => {
  const customIcon = new Icon({
		iconUrl: Cave,
		iconSize: [30, 30] // size of the icon
	})

	return (
		<>
		{
			caves.map( (cave) => (
				// <CircleMarker center={cave.coordinates} radius={5} pathOptions={{ color: 'black', fillColor: 'black' }}>
				<Marker position={cave.coordinates} icon={customIcon}>
					<Popup>
						{cave.name}
					</Popup>
				</Marker>
				// </CircleMarker>
			))
		}
		</>
	)
}

export default CavePositionLayer