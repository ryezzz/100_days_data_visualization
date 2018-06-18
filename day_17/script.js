mapboxgl.accessToken = 'pk.eyJ1IjoicnlleiIsImEiOiJjajl6eW5laDQyMWJyMnFucmJteHhlZnFiIn0.1mxSh4ahOUyf073K_eDdvQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ryez/cjdnttcgi0bto2rlqsrz6jbx7',
    zoom: 3,
    center: [-95.7129, 37.090]
});

// map.scrollZoom.disable()

    var container = map.getCanvasContainer()
    var svg = d3.select(container).append("svg")


    // map.addControl(new mapboxgl.Navigation());

    // Setup our svg layer that we can manipulate with d3

// var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');

// function switchLayer(layer) {
//     var layerId = layer.target.id;
//     map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
// }

// for (var i = 0; i < inputs.length; i++) {
//     inputs[i].onclick = switchLayer;
// }