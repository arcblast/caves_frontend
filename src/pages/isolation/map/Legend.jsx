import { useEffect } from 'react';
import L from 'leaflet';
import { getColor } from '@/lib/utils';
function Legend({ map }) {


    console.log(map);
    useEffect(() => {
      if (map) {
        const legend = L.control({ position: "bottomright" });
  
        // legend.onAdd = () => {
        //   const div = L.DomUtil.create("div", "info legend");
        //   div.innerHTML =
        //     "<h4>This is the legend</h4>" +
        //     "<b>Lorem ipsum dolor sit amet consectetur adipiscing</b>";
        //   return div;
        // };
  
        // legend.addTo(map);
        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [10,30,60,90],
                labels = [];
                div.innerHTML += '<b>'+'Strain Count'+'</b><br>'
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }
        
            return div;
        };
        
        legend.addTo(map);
      }
    }, [map]); //here add map
    return null;
  }

export default Legend
