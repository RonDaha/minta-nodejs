import request from "../../utils/request";
import {HwsData, WeatherData} from "../../interfaces/WeatherData";
import {errorHandler} from "../../utils/errorHandler";

/* Responsible for the Weather related business logic. */
export class Weather {

    private async getMarsWeather(): Promise<WeatherData | void> {
        /* The url should move to ENV, i left it here to simplify the review */
        return request<WeatherData>('https://api.nasa.gov/insight_weather/?api_key=7WyeB3ps61WmhG4dfNQn3Awi8mL1YpuQcFslWNv3&feedtype=json&ver=1.0')
            .catch(errorHandler.handleError)
    }

    async getLastHws(): Promise<HwsData | null> {
        const data: WeatherData | void = await this.getMarsWeather()
        if (!data) {
            return null
        }
        try {
            const lastKey: number = data.validity_checks.sols_checked[data.validity_checks.sols_checked.length - 1]
            const lastWeatherRecord = data.validity_checks[lastKey]
            return lastWeatherRecord.HWS
        } catch (e) {
            errorHandler.handleError(e)
            return null
        }
    }

}
