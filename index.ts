import express, { Application } from 'express'
import Api from './src/entry-points/Api'
import { Meteor } from './src/domains/Nasa/Meteor'
import { errorHandler } from "./src/utils/errorHandler";
import {Nasa} from "./src/domains/Nasa/Nasa";

/* Uncaught errors handling */
process.on('uncaughtException', (e: Error) => {
    errorHandler.handleError(e)
    if (!errorHandler.shouldStayAlive(e)) {
        process.exit(-1)
    }
})
process.on('unhandledRejection', (e: Error) => {
    errorHandler.handleError(e)
    if (!errorHandler.shouldStayAlive(e)) {
        process.exit(-1)
    }
})


const bootstrap = async () => {

    const app: Application = express()
    const port: number = 3000;

    /* Middlewares */
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    /* Entry Points (currently, only API supported) */
    app.use('/nasa', Api)

    /* Init relevant domains */
    const nasa: Nasa = new Nasa()
    await nasa.init()

    /* Start the server */
    app.listen(port, (): void => console.log(`Connected successfully on port ${port}`))
}

bootstrap()

