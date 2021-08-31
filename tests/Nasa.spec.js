import { Nasa } from '../src/domains/Nasa/Nasa'
import { Meteor } from '../src/domains/Nasa/Meteor'

/* Testing the Nasa API is up and response the expected data structure */
describe('Testing the Nasa Domain', () => {

    test('Nasa', async () => {

        /* Make sure the app initialize successfully (the Nasa API is up) */
        const nasa = new Nasa()
        await nasa.init()

        const meteor = new Meteor()

        /* Test Filter #1 */
        const dataFilteredByYear = meteor.getMeteorData({ year: 1994 })
        expect(Array.isArray(dataFilteredByYear)).toBe(true)
        expect(dataFilteredByYear.length).toEqual(6)

        /* Test Filter #2 */
        const dataFilteredByYearAndMass = meteor.getMeteorData({ year: 1994, mass: 1000 })
        expect(Array.isArray(dataFilteredByYearAndMass)).toBe(true)
        expect(dataFilteredByYearAndMass.length).toEqual(5)

        /* Test without filters and that the 'HWS' property has been added */
        const dataWithWeather = await nasa.getMeteorDataWithWeather({})
        expect(Array.isArray(dataWithWeather)).toBe(true)
        expect(dataWithWeather[0]).toHaveProperty('HWS')

    })

})



