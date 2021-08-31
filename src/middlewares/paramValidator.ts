import {NextFunction, Request, Response} from "express";
import {FilterOptions} from "../interfaces/FilterOptions";
import {isNumeric} from "../utils/helpers";

/* Middleware to validate the query params */
export const paramValidator = (req: Request<any, any, any, FilterOptions>, res: Response, next: NextFunction) => {

    const handleBadRequest = (param: string) => {
        res.status(400)
        console.debug(`request failed query param validation - ${param}`)
        res.send({ message: `Invalid ${param} value` })
    }

    if(req.query.year && !isNumeric(req.query.year)) {
        handleBadRequest('year')
        return
    }

    if(req.query.mass && !isNumeric(req.query.mass)) {
        handleBadRequest('mass')
        return
    }
    /* On successful validation */
    next()
}
