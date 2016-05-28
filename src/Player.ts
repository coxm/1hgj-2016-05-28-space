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

	getLatLng(): L.LatLng {
		return this.planet.getLatLng();
	}

	moveTo(destination: Planet): this {
		if (this.planet) {
			const distance: number = this.planet.getLatLng().distanceTo(
				destination.getLatLng()
			);
			const fuelRequired: number = Math.sqrt(distance) / 20;
			if (fuelRequired > this.fuel) {
				messageUser(
					`Insufficient fuel (requires ${fuelRequired.toFixed(2)})`
				);
				return;
			}
			this.setFuel(this.fuel - fuelRequired);
			this.planet.closePopup();
		}
		this.planet = destination;
		this.planet.bindPopup(this.popup).openPopup();

		if (this.planet === jam.objective) {
			$('#map-container').parent().html('<h1>Success!</h1>');
		}
		else if (this.planet.fuel) {
			messageUser('Found fuel: ' + this.planet.fuel.toFixed(2));
			this.setFuel(this.fuel + this.planet.fuel);
		}
		return this;
	}
}


} // namespace jam
