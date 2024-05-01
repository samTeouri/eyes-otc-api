import { OSRM, IOsrm, IOsrmRouteResult } from 'osrm-rest-client';

export class OSMRoutingService {
    #osrmEngine: IOsrm;

    constructor() {
        const _osrmEngine = OSRM();
        this.#osrmEngine = _osrmEngine;
    }

    getDistance = async (startLng: number, startLat: number, destLng: number, destLat: number) => {
        this.#osrmEngine.route(
            {
                coordinates: [[startLng, startLat], [destLng, destLat]],
            },
            async (error: Error | null, results: IOsrmRouteResult | undefined) => {
                if (error) {
                    throw error;
                };
                if (results) {
                    console.log("distance", results.routes[0].distance);
                    return results.routes[0].distance;
                }
            }
        );
    }
}