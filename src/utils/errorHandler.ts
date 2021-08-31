import { KnownError } from '../Errors'

/* Centralized error handling */
class ErrorHandler {
    public handleError(err: Error): void {
        console.error(err)
        /* Do any relevant operations here... (like notify dev team) */
    }

    /* Check if the app can continue to run after this error emitted */
    public shouldStayAlive(error: Error) {
        if (error instanceof KnownError) {
            return error.stayAlive
        }
        return false
    }
}
export const errorHandler = new ErrorHandler()
