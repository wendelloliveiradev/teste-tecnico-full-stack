import { HttpError, MiddlewareType } from "../types/definitions.js";

/* Um simples middleware que lida com possíveis erros durante o uso do middleware de validação */
export const errorHandlerMiddleware: MiddlewareType = async (_body, _method, _path, res, next) => {
    try {
        await next();
    } catch (error) {
        if (error instanceof HttpError) {
            console.error(`Error: ${error.error_code} - ${error.message}`);
            res.writeHead(error.statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error_code: error.error_code, error_description: error.message }));
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }
};