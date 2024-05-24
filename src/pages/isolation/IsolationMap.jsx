import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer,  } from 'react-leaflet';
import MunicitiesMapLayer from './map/MunicitiesMapLayer';
import ProvinceMapLayer from './map/ProvinceMapLayer';
import StrainsMapLayer from './map/StrainsMapLayer';
import { useState } from 'react';

const IsolationMap = ({data, handleSetFilter}) => {

	const [ selectedLocation, setSelectedLocation ] = useState('')

  return (
    <div className='w-full h-full'>
			<Card className="bg-background/25 relative z-40">
				<CardHeader className='flex flex-row justify-between pb-4'>
					<div>
						<CardTitle>Map View</CardTitle>
						<CardDescription>Click and view strains by location.</CardDescription>
					</div>
					<div className=' items-center bg- rounded-sm justify-center'>
						{
							selectedLocation ? 
								<>
									<span className='text-base font-semibold text-foreground'>{selectedLocation}</span>
									<span className='text-base text-foreground ml-2'> {data?.filter( (item) => item.city_province?.toLowerCase().includes(selectedLocation.toLowerCase())).length} strains</span>
								</>
							:
							<span className='text-base font-semibold text-foreground'>Hover over an area</span>
							// <span className='text-base font-semibold text-dimBlack'>{selected}</span>
						}
					</div>
				</CardHeader>
				<CardContent>
					<MapContainer center={[14.1651, 121.2402]} zoom={8} zoomControl className='rounded-sm'>
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
							<LayersControl.Overlay checked name='Province Heat Map'>
								<LayerGroup>
									<ProvinceMapLayer strains={data} handleSetFilter={handleSetFilter} setSelectedLocation={setSelectedLocation} />
								</LayerGroup>	
							</LayersControl.Overlay>
							<LayersControl.Overlay name='Muncities Heat Map'>
								<LayerGroup>
									<MunicitiesMapLayer strains={data} handleSetFilter={handleSetFilter} setSelectedLocation={setSelectedLocation}  />
								</LayerGroup>	
							</LayersControl.Overlay>
							<LayersControl.Overlay checked name='Strains'>
								<LayerGroup>
									<StrainsMapLayer strains={data} />
								</LayerGroup>
							</LayersControl.Overlay>
						</LayersControl>
					</MapContainer>
				</CardContent>
			</Card>
			
    </div>
  )
}

export default IsolationMap