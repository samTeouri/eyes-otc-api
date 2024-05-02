import { OSRM, IOsrm, IOsrmRouteResult } from 'osrm-rest-client';

export class OSMRoutingService {
    #osrmEngine: IOsrm;

    constructor() {
        const _osrmEngine = OSRM();
        this.#osrmEngine = _osrmEngine;
    }

    getDistance = async (startCoords: [number, number], destCoords: [number, number]): Promise<number | void> => {
        this.#osrmEngine.route(
            {
                coordinates: [startCoords, destCoords],
            },
            async (error: Error | null, results: IOsrmRouteResult | undefined) => {
                if (error) {
                    throw error;
                }
                if (results) {
                    return results.routes[0].distance;
                }
            }
        );
    }
}