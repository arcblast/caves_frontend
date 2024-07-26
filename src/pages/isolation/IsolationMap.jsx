import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvent, Pane  } from 'react-leaflet';
import MunicitiesMapLayer from './map/MunicitiesMapLayer';
import ProvinceMapLayer from './map/ProvinceMapLayer';
import StrainsMapLayer from './map/StrainsMapLayer';
import { useState,useRef } from 'react';
import CavePositionLayer from './map/CavePositionLayer';
import Legend from './map/Legend';
import Legend2 from './map/Legend2';

function SetViewOnClick({ animateRef }) { //Animated Panning View ()
	// const map = useMapEvent('click', (e) => {
	//   map.setView(e.latlng, map.getZoom(), {
	// 	animate: animateRef.current || false,
	//   })
	// })
	// return null
  }




const IsolationMap = ({data, handleSetFilter}) => {
	const animateRef = useRef(true)
	const [ selectedLocation, setSelectedLocation ] = useState('')
	const [ selectedLocStrainCount, setSelectedLocStrainCount ] = useState(0)
	const [map, setMap] = useState(null);
	
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
									<span className='text-base text-foreground ml-2'> {selectedLocStrainCount} strains</span>
								</>
							:
							<span className='text-base font-semibold text-foreground'>Hover over an area</span>
							// <span className='text-base font-semibold text-dimBlack'>{selected}</span>
						}
					</div>
				</CardHeader>
				<CardContent>
					<MapContainer center={[14.1651, 121.2402]} zoom={8.5} zoomSnap={0.25}   zoomControl className='rounded-sm'
					ref={setMap}>
					
						
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Legend map={map} />
						{/* <Legend2 map={map} name={selectedLocation} density={selectedLocStrainCount} /> */}
						<SetViewOnClick animateRef={animateRef}/>
						<LayersControl position='topright' collapsed={false}>
							{/* <LayersControl.Overlay name='Center'>
								<Marker position={[14.1651, 121.2402]} >
									<Popup>
										Center
									</Popup>
								</Marker>
							</LayersControl.Overlay> */}
							<LayersControl.BaseLayer checked name='Province Heat Map'>
								<LayerGroup>
									<ProvinceMapLayer map1={map} strains={data} handleSetFilter={handleSetFilter} setSelectedLocation={setSelectedLocation} setSelectedLocStrainCount={setSelectedLocStrainCount} />
								</LayerGroup>	
							</LayersControl.BaseLayer>
							<LayersControl.BaseLayer  name='Muncities Heat Map'>
								<LayerGroup>
									<MunicitiesMapLayer map1={map} strains={data} handleSetFilter={handleSetFilter} setSelectedLocation={setSelectedLocation} setSelectedLocStrainCount={setSelectedLocStrainCount} />
								</LayerGroup>	
							</LayersControl.BaseLayer>
							
							<LayersControl.Overlay checked name='Strains'>
								<LayerGroup>
									<StrainsMapLayer strains={data} />
								</LayerGroup>
							</LayersControl.Overlay>
							<LayersControl.Overlay name='Cave Positions'>
								<LayerGroup>
									<CavePositionLayer />
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