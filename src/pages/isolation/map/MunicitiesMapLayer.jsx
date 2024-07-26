import { municities } from '@/constants/4AMunicitiesGeoJSON';
import { Polygon,Tooltip} from 'react-leaflet';
import { getColor } from '@/lib/utils';

export default function MunicitiesMapLayer({map1,strains, handleSetFilter, setSelectedLocation, setSelectedLocStrainCount}) {
  return (
		<>
		{
			municities.features.map((muncity) => {
				var coordinates;
				// Polygon
				if(muncity.geometry.type === 'Polygon') coordinates = muncity.geometry.coordinates[0].map((item) => [item[1], item[0]]);
				// Multipolygon
				else coordinates = muncity.geometry.coordinates.map( (coor) => coor[0].map((item) => [item[1], item[0]]))

				// const strainCount = strains?.filter( (item) => item.municity?.toLowerCase().includes(muncity.properties.ADM3_EN.toLowerCase()) && item.province?.toLowerCase().includes(muncity.properties.ADM2_EN.toLowerCase())).length
				const strainCount = strains?.filter( (item) => muncity.properties.ADM3_EN.toLowerCase().includes(item.municity?.toLowerCase()) && muncity.properties.ADM2_EN.toLowerCase().includes(item.province?.toLowerCase())).length
				
				return (<Polygon
					pathOptions={{
						fillColor: getColor(strainCount),
						// fillColor: '#168b46',
						fillOpacity: 0.7,
						weight: 2,
						opacity: 1,
						dashArray: 3,
						color: 'green'
					}}
					positions={coordinates}
					eventHandlers={{
						mouseover: (e) => {
							const layer = e.target;
							layer.setStyle({
								dashArray: '',
								weight: 5,
								opacity: 1,
								color: '#666',
							})
							// setSelectedLocation(muncity.properties.ADM3_EN)
							// setSelectedLocStrainCount(strainCount)

						},
						mouseout: (e) => {
							const layer = e.target;
							layer.setStyle({
								weight: 2,
								dashArray: '3',
								color: 'green',
							});
						},
						click: (e) => {
							handleSetFilter({
								id: 'municity',
								value: muncity.properties.ADM3_EN.toLowerCase()
							})
							// const num = map1.getBoundsZoom(e.target.getBounds())				
							// map1.fitBounds(e.target.getBounds(),{maxZoom:num, padding:[10,10]});

							setSelectedLocation(muncity.properties.ADM3_EN)
							setSelectedLocStrainCount(strainCount)


							const num = map1.getBoundsZoom(e.target.getBounds())-1.5				
							map1.fitBounds(e.target.getBounds(),{maxZoom:num, padding:[7,7]});
							console.log("ZOOM "+map1.getZoom(), "ZOOM NUM ",num)
						}
					}}
					key={muncity.properties.ADM2_EN + muncity.properties.ADM3_EN}
				>
					<Tooltip  sticky direction='left'>{muncity.properties.ADM3_EN}</Tooltip>
					</Polygon>)
			})
		}
		</>
	)
}
