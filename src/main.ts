namespace jam {


export type Planet = L.CircleMarker;


export const map: L.Map = L.map('map-container');


export const planets: Planet[] = [];


export const player: Player = new Player();


function onPlanetClick(ev: L.LeafletEvent): void {
	player.moveTo(ev.target);
}


map.on('click', function(): void {
	messageUser('');
});


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
	planet.on('click', onPlanetClick);
}


const bounds: L.LatLngBounds = new L.LatLngBounds([
	planets[0].getLatLng(),
	planets[0].getLatLng()
]);


planets.forEach((planet: Planet): void => {
	bounds.extend(<any> planet.getLatLng());
});

map.fitBounds(bounds);


player.moveTo(planets[0]);


} // namespace jam
