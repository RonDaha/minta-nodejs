import express, { Router, Request } from 'express'
import { FilterOptions } from '../interfaces/FilterOptions'
import { Nasa } from '../domains/Nasa/Nasa'
import { MeteorDataWithWeather } from '../interfaces/MeteorData'
import { paramValidator } from '../middlewares/paramValidator'

const Api: Router = express.Router()

Api.get('/meteor', paramValidator, async (req: Request<any, any, any, FilterOptions>, res) => {

    console.debug('GET - /nasa/meteor')

    const nasa: Nasa = new Nasa()
    const data: MeteorDataWithWeather[] | null = await nasa.getMeteorDataWithWeather(req.query)
    if (!data) {
        res.status(500)
        res.send({ message: 'Internal server error' })
        return
    }

    console.debug(`Got ${data.length} records`)
    res.status(200)
    res.send({ data })

})

export default Api
