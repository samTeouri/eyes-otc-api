import { OSRM, IOsrm, IOsrmRouteResult } from 'osrm-rest-client';

export class OSMRoutingService {
    #osrmEngine: IOsrm;

    constructor() {
        this.#osrmEngine = OSRM();
    }

    getDistance = (startCoords: [number, number], destCoords: [number, number]): Promise<number> => {
        return new Promise((resolve, reject) => {
            this.#osrmEngine.route(
                {
                    coordinates: [startCoords, destCoords],
                },
                (error: Error | null, results: IOsrmRouteResult | undefined) => {
                    if (error) {
                        reject(`Error while getting distance: ${error}`);
                        return;
                    }
                    if (results && results.routes.length > 0 && results.routes[0].distance !== undefined) {
                        resolve(results.routes[0].distance);
                    } else {
                        reject('No route results found or distance is undefined');
                    }
                }
            );
        });
    }
}