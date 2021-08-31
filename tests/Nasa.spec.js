import { Nasa } from '../src/domains/Nasa/Nasa'
import { Meteor } from '../src/domains/Nasa/Meteor'
import { Weather } from '../src/domains/Nasa/Weather'


/* Testing the Nasa API is up and response the same data structure */
describe('Testing the Nasa Domain', () => {


    test('Nasa API is up and the data manipulation is working as expected', async () => {

        /* Make sure the app initialize successfully */
        const nasa = new Nasa()
        await nasa.init()

        const meteor = new Meteor()
        const weather = new Weather()

        /* Test Filter #1 */
        const dataFilteredByYear = meteor.getMeteorData({ year: 1994 })
        expect(dataFilteredByYear.length).toEqual(6)

        /* Test Filter #2 */
        const dataFilteredByYearAndMass = meteor.getMeteorData({ year: 1994, mass: 1000 })
        expect(dataFilteredByYearAndMass.length).toEqual(5)

        /* Test without filters and the 'HWS' is added */
        const dataWithWeather = await nasa.getMeteorDataWithWeather({})
        expect(dataWithWeather[0]).toHaveProperty('HWS')

    })


})



