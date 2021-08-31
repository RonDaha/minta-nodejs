import {NextFunction, Request, Response} from "express";
import {FilterOptions} from "../interfaces/FilterOptions";
import {isNumeric} from "../utils/helpers";

/* Middleware to validate the query params */
export const paramValidator = (req: Request<any, any, any, FilterOptions>, res: Response, next: NextFunction) => {

    if(req.query.year && !isNumeric(req.query.year)) {
        res.status(400)
        res.send({ message: 'Invalid year value' })
        return
    }

    if(req.query.mass && !isNumeric(req.query.mass)) {
        res.status(400)
        res.send({ message: 'Invalid mass value' })
        return
    }
    /* On successful validation */
    next()
}
