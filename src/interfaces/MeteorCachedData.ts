import {MeteorData} from "./MeteorData";

export interface MeteorCachedData {
    all: MeteorData[]
    byYear: {[key: string]: MeteorData[]}
}
