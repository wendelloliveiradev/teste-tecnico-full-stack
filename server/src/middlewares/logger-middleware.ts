import { IncomingMessage, ServerResponse } from "node:http";

type NextFunction = () => void;

function loggingMiddleware(req: IncomingMessage, res: ServerResponse, next: NextFunction) {
    const start = Date.now();
    
    res.on('finish', () => {
        const elapsed = Date.now() - start;
        console.log(`${req.method} ${req.url} ${res.statusCode} ${elapsed}ms`);
    });

    next();
}