/* The base application Error */
export class KnownError extends Error {

    public readonly errorCode: number
    public readonly stayAlive: boolean

    constructor(errorCode: number, stayAlive: boolean = false) {
        super()
        this.errorCode = errorCode
        this.stayAlive = stayAlive
        Error.captureStackTrace(this)
    }
}


export class InitializeError extends KnownError {
    /* Indicate on what phase the initialize has failed */
    public readonly phase: number

    constructor(phase: number) {
        super(1)
        this.phase = phase
    }
}



export class ResponseError extends KnownError {

    response: Response;

    constructor(response: Response) {
        super(2)
        this.response = response
    }
}
