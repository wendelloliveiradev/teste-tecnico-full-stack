import { IncomingMessage, ServerResponse } from "node:http";
import { MiddlewareType } from "../types/definitions.ts";

export const loggingMiddleware: MiddlewareType = async (body, method, path, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const elapsed = Date.now() - start;
        console.log(`${method} at ${path} with body ${JSON.stringify(body)} was finished with ${res.statusCode} in ${elapsed}ms`);
    });

    next();
}