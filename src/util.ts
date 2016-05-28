namespace jam {


export const MAX_PLANETS: number = 100;


export const WORLD_BOUNDS = {
	lat: {
		min: -50,
		max: 50
	},
	lng: {
		min: -50,
		max: 50
	}
};


export const MAX_FUEL: number = 100;


export function messageUser(msg: string): void {
	$('.message').text(msg);
}


export function randInRange(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}


export function randLatLng(): L.LatLng {
	return L.latLng(
		randInRange(WORLD_BOUNDS.lat.min, WORLD_BOUNDS.lat.max),
		randInRange(WORLD_BOUNDS.lng.min, WORLD_BOUNDS.lng.max)
	);
}


export function rand256Int(): number {
	return (randInRange(0, 256) | 0) % 256;
}


export function randColour(): string {
	return `rgb(${rand256Int()},${rand256Int()},${rand256Int()})`;
}


} // namespace jam
