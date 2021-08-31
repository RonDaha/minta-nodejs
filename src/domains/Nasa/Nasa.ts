import {Meteor} from "./Meteor";
import {Weather} from "./Weather";
import {FilterOptions} from "../../interfaces/FilterOptions";
import {MeteorData, MeteorDataWithWeather} from "../../interfaces/MeteorData";
import {HwsData} from "../../interfaces/WeatherData";
import {errorHandler} from "../../utils/errorHandler";

/* The main domain's class which responsible the Nasa related business logic. */
export class Nasa {

    private meteor: Meteor
    private weather: Weather

    constructor() {
        this.meteor = new Meteor()
        this.weather = new Weather()
    }

    async init() {
        await this.meteor.init()
    }

    async getMeteorDataWithWeather(filterBy: FilterOptions): Promise<MeteorDataWithWeather[] | null> {
        try {
            const meteorData: MeteorData[] = this.meteor.getMeteorData(filterBy)
            const hwsData: HwsData | null = await this.weather.getLastHws()
            return meteorData.map((record: MeteorData) => {
                return {
                    HWS: hwsData ? hwsData : null,
                    ...record
                }
            })
        } catch (e) {
            errorHandler.handleError(e)
            return null
        }

    }
}
