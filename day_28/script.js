// mapboxgl.accessToken = 'pk.eyJ1IjoicnlleiIsImEiOiJjajl6eW5laDQyMWJyMnFucmJteHhlZnFiIn0.1mxSh4ahOUyf073K_eDdvQ';
// var map = new mapboxgl.Map({
//     container: 'map', // container id
//     style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
//     center: [-96, 37.8], // starting position [lng, lat]
//     zoom:4// starting zoom
// });





var mapboxAccessToken = "pk.eyJ1IjoicnlleiIsImEiOiJjajl6eW5laDQyMWJyMnFucmJteHhlZnFiIn0.1mxSh4ahOUyf073K_eDdvQ";
// var map = L.map('map')

var map = L.map('map').setView([37.8, -96], 4);


L.tileLayer('https://api.mapbox.com/styles/v1/ryez/cjiywowaj02lg2soa9htyt2ob/tiles/256/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    // style: 'mapbox://styles/mapbox/streets-v9',
}).addTo(map);
L.geoJson(statesData).addTo(map);

// L.geoJson(statesData).addTo(map);

function getColor(d) {
    return d > 70 ? '#8c2d04' :
           d > 60  ? '#8c2d04' :
           d > 50  ? '#8c2d04' :
           d > 40  ? '#f16913' :
           d > 30   ? '#fd8d3c' :
           d > 20   ? '#fdae6b' :
           d > 10   ? '#feedde' :
                      '#ffffff';
                      
  ['#feedde','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#8c2d04']                 
                      
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties["Death Rate"]),
        weight: .8,
        opacity: 1,
        color: 'white',
        // dashArray: '3',
        fillOpacity: .5
    };
}


L.geoJson(statesData, {style: style}).addTo(map);


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    
    info.update(layer.feature.properties)
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}


var geojson;
// ... our listeners

function zoomToFeature(e) {
    var layer = e.target;
    map.fitBounds(e.target.getBounds());
    info.update(layer.feature.properties)
}



    var selection;


function onEachFeature(feature, layer) {
    layer.on({
        
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: function(e) {
             zoomToFeature(e)
}
// if (selection) {
//     geojson.resetStyle(e.target)
//     selection = null
// }
//         selection = e.target

//     geojson.resetStyle(e.target);
//     highlightFeature(e)
//     zoomToFeature(e)
    
    

//     //   e.target.setStyle(gardenSelectedStyle());
     
//     //   selectedLayer = gardenLayer;

//     //   // Insert some HTML with the feature name
//     //   buildSummaryLabel(feature);

//       L.DomEvent.stopPropagation(e); // stop click event from being propagated further
//     }
    });
}


geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = "<h4>Alzheimer's Death Rate</h4>" +  (props ?
        '<b>' + props.name + '</b><br />' + props["Death Rate"] + ' people / 100'
        : 'Hover over a state');
};

info.addTo(map);



var legend = L.control({position: 'bottomright'});


legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 30, 40, 50],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

