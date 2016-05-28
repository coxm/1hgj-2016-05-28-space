namespace jam {


export class Player {
	planet: Planet;
	popup: L.Popup;
	fuel: number;

	constructor() {
		this.popup = L.popup({
			closeOnClick: false
		}).setContent('You')
		this.planet = null;
		this.setFuel(MAX_FUEL);
	}

	setFuel(fuel: number): this {
		this.fuel = fuel;
		$('.fuel').text(fuel);
		return this;
	}

	moveTo(destination: Planet): this {
		if (this.planet) {
			const distance: number = this.planet.getLatLng().distanceTo(
				destination.getLatLng()
			);
			const fuelRequired: number = Math.sqrt(distance) / 100;
			if (fuelRequired > this.fuel) {
				messageUser(`Insufficient fuel (requires ${fuelRequired})`);
				return;
			}
			this.setFuel(this.fuel - distance);
			this.planet.closePopup();
		}
		this.planet = destination;
		this.planet.bindPopup(this.popup).openPopup();
		return this;
	}
}


} // namespace jam
