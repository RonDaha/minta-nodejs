import {HwsData} from "./WeatherData";

export interface MeteorData {
    name: string,
    id: string,
    nametype: string,
    recclass: string,
    mass: string,
    fall: string,
    year: string,
    reclat: string,
    reclong: string,
    geolocation: MeteorGeoData
}


export interface MeteorGeoData {
    type: string,
    coordinates: number[]
}

export interface MeteorDataWithWeather {
    HWS: HwsData | null,
    name: string,
    id: string,
    nametype: string,
    recclass: string,
    mass: string,
    fall: string,
    year: string,
    reclat: string,
    reclong: string,
    geolocation: MeteorGeoData
}

