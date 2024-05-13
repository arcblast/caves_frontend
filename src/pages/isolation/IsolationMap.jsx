import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer,  } from 'react-leaflet';
import MunicitiesMapLayer from './map/MunicitiesMapLayer';
import ProvinceMapLayer from './map/ProvinceMapLayer';
import StrainsMapLayer from './map/StrainsMapLayer';

const IsolationMap = ({data}) => {

  return (
    <div className='w-full h-full'>
			<Card className="bg-background/25 m-4">
				<CardHeader>
					<CardTitle>Map View</CardTitle>
					<CardDescription>Search and view strains by location.</CardDescription>
				</CardHeader>
					<MapContainer center={[14.1651, 121.2402]} zoom={19} zoomControl className='rounded-sm'>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>

						<LayersControl position='topright'>
							<LayersControl.Overlay name='Center'>
								<Marker position={[14.1651, 121.2402]} >
									<Popup>
										Center
									</Popup>
								</Marker>
							</LayersControl.Overlay>
							<LayersControl.Overlay name='Province Heat Map'>
								<LayerGroup>
									<ProvinceMapLayer strains={data} />
								</LayerGroup>	
							</LayersControl.Overlay>
							<LayersControl.Overlay name='Muncities Heat Map'>
								<LayerGroup>
									<MunicitiesMapLayer strains={data} />
								</LayerGroup>	
							</LayersControl.Overlay>
							<LayersControl.Overlay checked name='Strains'>
								<LayerGroup>
									<StrainsMapLayer strains={data} />
								</LayerGroup>
							</LayersControl.Overlay>
						</LayersControl>
					</MapContainer>
			</Card>
			
    </div>
  )
}

export default IsolationMap