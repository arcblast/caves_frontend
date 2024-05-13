import { municities } from '@/constants/4AMunicitiesGeoJSON';
import { Polygon } from 'react-leaflet';
import { getColor } from '@/lib/utils';

export default function MunicitiesMapLayer({strains}) {
  return (
		<>
		{
			municities.features.map((muncity) => {
				var coordinates;
				// Polygon
				if(muncity.geometry.type === 'Polygon') coordinates = muncity.geometry.coordinates[0].map((item) => [item[1], item[0]]);
				// Multipolygon
				else coordinates = muncity.geometry.coordinates.map( (coor) => coor[0].map((item) => [item[1], item[0]]))

				const strainCount = strains?.filter( (item) => item.city_province?.toLowerCase().includes(muncity.properties.ADM3_EN.toLowerCase()) && item.city_province?.toLowerCase().includes(muncity.properties.ADM2_EN.toLowerCase())).length
				
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
								weight: 2,
								opacity: 1,
								color: 'black',
							})
							// setSelected(muncity.properties.ADM3_EN)
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
							// handleFilterData(strains?.filter( (strain) => {
							// 	return (
							// 		strain.city_province?.toLowerCase().includes(province.properties.ADM2_EN.toLowerCase())
							// 	)
							// }))
						}
					}}
					key={muncity.properties.ADM2_EN}
				/>)
			})
		}
		</>
	)
}
