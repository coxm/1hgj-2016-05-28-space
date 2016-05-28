namespace jam {


export interface Planet extends L.CircleMarker {
	fuel: number;
}


export const map: L.Map = L.map('map-container');


export const planets: Planet[] = [];


export const player: Player = new Player();


function onPlanetClick(ev: L.LeafletEvent): void {
	player.moveTo(ev.target);
}


// Remove the close popup part.
// (Popup) or (String || HTMLElement, LatLng[, Object])
map.openPopup = (<any> function (popup: any, latlng: any, options: any) {
	if (!(popup instanceof L.Popup)) {
		var content = popup;

		popup = new L.Popup(options)
			.setLatLng(latlng)
			.setContent(content);
	}
	popup._isOpen = true;
	this._popup = popup;
	return this.addLayer(popup);
});


map.on('click', function(): void {
	messageUser('');
});


for (let i: number = 0; i < MAX_PLANETS; ++i) {
	const latlng: L.LatLng = randLatLng();
	const planet: Planet = <Planet> new L.CircleMarker(latlng, {
		fill: true,
		fillColor: randColour(),
		color: randColour(),
		fillOpacity: 1.0
	});
	planets.push(planet);
	map.addLayer(planet);
	planet.on('click', onPlanetClick);
	planet.fuel = randFuel();
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


export let objective: Planet = null;
let currentMaxDist: number = 0;
planets.forEach((p: Planet): void => {
	const dist: number = p.getLatLng().distanceTo(player.getLatLng());
	if (dist > currentMaxDist) {
		objective = p;
		currentMaxDist = dist;
	}
});


objective.bindPopup(
	L.popup({ closeOnClick: false }).setContent('Objective')
);
setTimeout((): void => {
	objective.openPopup();
}, 500);


} // namespace jam
