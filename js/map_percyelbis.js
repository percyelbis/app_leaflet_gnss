var map = L.map('map').setView([-9.1899672,-75.015152], 5); // Peru

var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
}).addTo(map);

var satellite = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',{
  attribution: 'Google Satellite'
}).addTo(map)


// Ventana Emergente [erp, pg, bm, ai]
function Infoerp(feature, layer) {
    if (feature.properties && feature.properties.codigo) {
        layer.bindPopup("<b>Codigo: </b>"+feature.properties.codigo+"</b><br>"+"<b>Departamento: </b>"+feature.properties.departamen+"</b><br>"+"<b>Provincia: </b>"+feature.properties.provincia+"</b><br>"
      +"<b>Distrito: </b>"+feature.properties.distrito+"</b><br>"+"<b>Ubicación: </b>"+feature.properties.ubicación);
    }
}

function Infopg(feature, layer) {
    if (feature.properties && feature.properties.codi_pg) {
        layer.bindPopup("<b>Codigo: </b>"+feature.properties.codi_pg+"</b><br>"+"<b>Orden: </b>"+feature.properties.codi_orde+"</b><br>"+"<b>Localidad: </b>"+feature.properties.ubicacion_);
    }
}

function Infobm(feature, layer) {
    if (feature.properties && feature.properties.codigo) {
        layer.bindPopup("<b>Codigo: </b>"+feature.properties.codigo);
    }
}

// icon
var marker_erp = new L.Icon({
    iconSize: [21, 21],
    iconAnchor: [9, 21],
    popupAnchor:  [1, -24],
    iconUrl: 'images/erp.svg'
});

var marker_pg = new L.Icon({
    iconSize: [21, 21],
    iconAnchor: [9, 21],
    popupAnchor:  [1, -24],
    iconUrl: 'images/pg.svg'
});

var marker_bm = new L.Icon({
    iconSize: [21, 21],
    iconAnchor: [9, 21],
    popupAnchor:  [1, -24],
    iconUrl: 'https://image.flaticon.com/icons/svg/2702/2702604.svg'
});

// Show
var erp_js = L.geoJson(erp, {
  onEachFeature: Infoerp,
  pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: marker_erp});
  }
}).addTo(map)


var pg_js = L.geoJson(pg, {
  onEachFeature: Infopg,
  pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: marker_pg});
  }
}).addTo(map)

var bm_js = L.geoJson(bm, {
  onEachFeature: Infobm,
  pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: marker_bm});
  }
}).addTo(map)


// Layer Control
var baseMaps = {
    "OpenStreetMap": osmLayer,
    "Google Satellite": satellite
};
var overlayMaps = {
    "Estacion de rastreo Permanente -- 100km": erp_js,
    "Puntos Geodesicos Pasivos": pg_js,
    "BM": bm_js,
};

var control = L.control.layers(baseMaps,overlayMaps, {
  collapsed: false,
  autoZIndex: false,
}).addTo(map);

// search bar
var searchControl = new L.esri.Controls.Geosearch().addTo(map);

var results = new L.LayerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

// Medicion
L.control.polylineMeasure().addTo(map);
// Coordenadas
L.control.mousePosition().addTo(map);

// user
map.pm.addControls({
  position: 'topleft',
  drawCircle: false,
});
