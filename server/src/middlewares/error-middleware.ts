class HttpError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
    }
}

type Middleware = (req: any, res: any, next: () => void) => void;

const errorHandlerMiddleware: Middleware = async (req, res, next) => {
    try {
        await next();
    } catch (error) {
        if (error instanceof HttpError) {
            res.writeHead(error.statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }
};