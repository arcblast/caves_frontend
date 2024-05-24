import { CircleMarker, Popup } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { divIcon, point } from "leaflet"

// function printChild (cluster) {

// }

export default function StrainsMapLayer({strains}) {
	console.log(strains)

  const createClusterCustomIcon = (cluster) => {

		return new divIcon({
			html: `<span class='cluster-icon'>${cluster.getChildCount()}</span>`,
			className: 'cluster-custom-icon',
			iconSize: point(33, 33, true)
		})
	}


  return (
		<>
			<MarkerClusterGroup
				chunkedLoading
				iconCreateFunction={createClusterCustomIcon}
				className='text-semibold'
        onDblClick={() => console.log('Hello')}
			>
			{
				// strains?.strains.map( (strain) => (
				strains?.map( (strain) => (
					// I add random number so the strain don't overlap with each other
					<CircleMarker
						center={[strain?.location_latitude + (Math.random() * (0.00009 - 0.000001) + 0.000001), strain?.location_longitude + (Math.random() * (0.00009 - 0.000001) + 0.000001)]}
						radius={1.5}
						pathOptions={{ color: 'yellow', fillColor: 'yellow' }}
					>
						<Popup>
							{strain?.scientific_name}
						</Popup>
					</CircleMarker>
				))
			}
			</MarkerClusterGroup>
		</>
	)
}
