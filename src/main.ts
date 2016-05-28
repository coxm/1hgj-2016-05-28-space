namespace jam {


export type Planet = L.CircleMarker;


export const map: L.Map = L.map('map-container');


const planets: Planet[] = [];

for (let i: number = 0; i < MAX_PLANETS; ++i) {
	const latlng: L.LatLng = randLatLng();
	const planet: L.CircleMarker = new L.CircleMarker(latlng, {
		fill: true,
		fillColor: randColour(),
		color: randColour(),
		fillOpacity: 1.0
	});
	planets.push(planet);
	map.addLayer(planet);
	console.log('planet', latlng);
}


const bounds: L.LatLngBounds = new L.LatLngBounds([
	planets[0].getLatLng(),
	planets[0].getLatLng()
]);


planets.forEach((planet: Planet): void => {
	bounds.extend(<any> planet.getLatLng());
});

map.fitBounds(bounds);



} // namespace jam
