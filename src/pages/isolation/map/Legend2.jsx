import { useEffect } from 'react';
import L from 'leaflet';

function Legend2({ map, selected,count }) {
    function getColor(d) {
        return d > 1000 ? '#800026' :
              d > 500  ? '#BD0026' :
              d > 200  ? '#E31A1C' :
              d > 100  ? '#FC4E2A' :
              d > 50   ? '#FD8D3C' :
              d > 20   ? '#FEB24C' :
              d > 10   ? '#FED976' :
                          '#FFEDA0';
    }

    console.log("Selected "+selected);
    useEffect(() => {
      if (map) {
        // const info= L.control({ position: "topright" });
        const legend= L.control({ position: "topright" });
        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info legend");
          div.innerHTML =
          (selected ?
                    '<b>' + selected + '</b><br />' + count + ' people / mi<sup>2</sup>'
                    : 'Hover over a state');
          return div;
        };
  
        legend.addTo(map);

        // info.onAdd = function (map) {
        //     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        //     this.update();
        //     return this._div;
        // };
        
        // // method that we will use to update the control based on feature properties passed
        // info.update = function (props) {
        //     this._div.innerHTML = '<h4>Selected</h4>' +  (props ?
        //         '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        //         : 'Hover over a state');
        // };
        
        
        // info.addTo(map);
      }
    }, [map]); //here add map
    return null;
  }

export default Legend2
