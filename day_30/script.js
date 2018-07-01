    mapboxgl.accessToken = 'pk.eyJ1IjoicnlleiIsImEiOiJjamoyMjA0dDgwejA4M3FvNnd0dHVpcjRqIn0.4wcv7imOeXFsy1BUJ1N5bQ'; // Put your Mapbox Public Access token here

    // Load a new map in the 'map' HTML div
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ryez/cjj21tmdf06gu2so1d6g5c1hm',
        center: [-74, 40.71],
        zoom: 9.5
    });
   var max = 5;
var fifth = 5 / .5;
var quantiles = [2, 4, 6, 8];


var legend = document.getElementById('legend');
function circleSize(quantile) {
  var radius = quantile;
  var diameter = radius*2;
  return diameter;
}
quantiles.forEach(function(quantile) {
  legend.insertAdjacentHTML('beforeend', '<div><span style="width:' + circleSize(quantile) + 'px;height:' + circleSize(quantile) + 'px;margin: ' + [(20 -circleSize(quantile)) / 2] + 'px"></span><p>' + quantile +'</p></div>');
});
    // Load the vector tile source from the Mapbox Pedestrian traffic example
    map.on('load', function() {

        map.addSource('NYPD_Motor_Vehicle_Collisions-1zd0cs', {
            "type": "geojson",
            "data": "data/features.geojson"
        });
        // Add the circle layer to the map
        map.addLayer({
            id: 'collisions',
            type: 'circle',
            source: {
                type: 'vector',
                url: 'mapbox://ryez.8gqg99xn' // Your Mapbox tileset Map ID
            },
            'source-layer': 'NYPD_Motor_Vehicle_Collisions-1zd0cs', // name of tilesets
            paint: {
                'circle-color': '#009e96',
                'circle-opacity': 0.5,
                // Add data-driven styles for circle radius



                'circle-radius': {
                    property: 'NUMBER_OF_PERSONS_INJURED',
                    stops: [
                        [{ zoom: 8, value: 0 }, 0],
                        [{ zoom: 8, value: 7 }, 4],
                        [{ zoom: 11, value: 0 }, 0],
                        [{ zoom: 11, value: 7 }, 9],
                        [{ zoom: 16, value: 0 }, 0],
                        [{ zoom: 16, value: 7 }, 52]
                    ]

                    //     stops: [
                    //   [1, 5],
                    //   [6, 1]
                    // ]


                }






            }

        });
        console.log(map.layer)


        map.on('click', function(e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['collisions'] });


            // if the features have no info, return nothing
            if (!features.length) {
                return;
            }

            var feature = features[0];

            // Populate the popup and set its coordinates
            // based on the feature found
            var popup = new mapboxgl.Popup()
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<div id=\'popup\' class=\'popup\' style=\'z-index: 10;\'> <h5> Detail: </h5>' +
                    '<ul class=\'list-group\'>' +
                    '<li class=\'list-group-item\'> Date: ' + feature.properties['DATE'] + ' </li>' +
                    '<li class=\'list-group-item\'> Number of people injuried: ' + feature.properties['NUMBER_OF_PERSONS_INJURED'] + ' </li>')
                .addTo(map);
        });

        // Use the same approach as above to indicate that the symbols are clickable
        // by changing the cursor style to 'pointer'
        map.on('mousemove', function(e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['collisions'] });
            map.getCanvas().style.cursor = features.length ? 'pointer' : '';
        });


    });



    // NUMBER OF PERSONS INJURED