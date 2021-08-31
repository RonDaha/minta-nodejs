import request from '../../utils/request'
import { MeteorData } from '../../interfaces/MeteorData'
import { FilterOptions } from '../../interfaces/FilterOptions'
import { errorHandler } from '../../utils/errorHandler'
import { MeteorCachedData } from '../../interfaces/MeteorCachedData'
import { InitializeError } from '../../Errors'

/* Use as dictionary with the 'year' as the key */
const meteorCachedData: MeteorCachedData = { all: [], byYear: {} }

/* Sub-domain Responsible for the Meteor related business logic. */
export class Meteor {

    constructor() {}

    private createDictionary(data: MeteorData[]): void {
        meteorCachedData.all = data
        for (const record of data) {
            const recordDate = new Date(record.year)
            const year = recordDate.getFullYear()
            if (year) {
                if (!meteorCachedData.byYear[year]) {
                    meteorCachedData.byYear[year] = []
                }
                meteorCachedData.byYear[year].push(record)
            }
        }
    }

    private async fetchMeteorData(): Promise<MeteorData[] | void> {
        /* The url should move to ENV, i left it here to simplify the review */
        return request<MeteorData[]>('https://data.nasa.gov/resource/y77d-th95.json')
            .catch(errorHandler.handleError)
    }

    async init(): Promise<void> {
        console.info('Fetching meteor landing data')
        const meteorData: MeteorData[] | void = await this.fetchMeteorData()
        if (!meteorData) {
            throw new InitializeError(1)
        }
        console.info('Creating meteor landing data dictionary')
        try {
            this.createDictionary(meteorData)
        } catch (e) {
            errorHandler.handleError(e)
            throw new InitializeError(2)
        }
    }

    getMeteorData(filterOptions: FilterOptions): MeteorData[] {
        try {
            if (filterOptions.year) {
                const meteorLandingByYear = meteorCachedData.byYear[filterOptions.year]
                if (!meteorLandingByYear) {
                    console.info(`No data for year - ${filterOptions.year}`)
                    return []
                }
                if (filterOptions.mass) {
                    return meteorLandingByYear.filter(record => Number(record.mass) > Number(filterOptions.mass))
                }
                return meteorLandingByYear
            }
           return meteorCachedData.all
        } catch (e) {
            errorHandler.handleError(e)
            return []
        }
    }

}
