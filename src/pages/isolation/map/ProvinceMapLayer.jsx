import { provinces } from '@/constants/4AProvincesGeoJSON';
import { Polygon,Tooltip,useMapEvent } from 'react-leaflet';
import {L} from 'leaflet';
import { getColor } from '@/lib/utils';
import { useState } from 'react';
function ZoomComponent(){
	const map = useMapEvent('click', (e) => {
		map.fitBounds(e.target.getBounds());
	})
	return null
  }

export default function ProvinceMapLayer({map1,strains, handleSetFilter, setSelectedLocation, setSelectedLocStrainCount}) {
  return (
		<>
		{
			provinces.features.map((province) => {
				var coordinates;
				// Polygon
				if(province.geometry.type === 'Polygon') coordinates = province.geometry.coordinates[0].map((item) => [item[1], item[0]]);
				// Multipolygon
				else coordinates = province.geometry.coordinates.map( (coor) => coor[0].map((item) => [item[1], item[0]]))

				const strainCount = strains?.filter( (item) => item.province?.toLowerCase().includes(province.properties.ADM2_EN.toLowerCase())).length
				
				return (<Polygon
					pathOptions={{
						fillColor: getColor(strainCount),
						// fillColor: '#168b46',
						fillOpacity: 0.7,
						weight: 1,
						opacity: 0.3,
						dashArray: 3,
						color: 'white'
					}}

					positions={coordinates}
					
					eventHandlers={{
						mouseover: (e) => {
							const layer = e.target;
							layer.setStyle({
								dashArray: '',
								weight: 3,
								opacity: 1,
								color: '#666',
							})
							
							// setSelectedLocation(province.properties.ADM2_EN)
							// setSelectedLocStrainCount(strainCount)
							layer.bringtoFront()
					
						},
						mouseout: (e) => {
							const layer = e.target;
			
							layer.setStyle({
								weight: 2,
								dashArray: '3',
								opacity: 0.4,
								color: '#666',
							});
						},
						click: (e) => {
							console.log("province1 "+province.properties.ADM2_EN.toLowerCase())
							handleSetFilter({
								id: 'province',
								value: province.properties.ADM2_EN.toLowerCase()
							})
							//
							setSelectedLocation(province.properties.ADM2_EN)
							
							setSelectedLocStrainCount(strainCount)
							// console.log("Max Zoom" +map1.getBoundsZoom(e.target.getBounds))
							
							const num = map1.getBoundsZoom(e.target.getBounds())				
							map1.fitBounds(e.target.getBounds(),{maxZoom:10, padding:[5,5]});
							console.log("ZOOM "+map1.getZoom(), "ZOOM NUM ",num)
							// map1.setOptions({maxZoom:null})
							// e.target.bringtoFront()
						}
					}}
					key={province.properties.ADM2_EN}
					
				>
					
					<Tooltip  sticky direction='left'>{province.properties.ADM2_EN}</Tooltip>
				</Polygon>)
			})
		}
		</>
	)
}
