import { MiddlewareType } from "../types/definitions.js";

/* Este middleware é apenas para exemplificar a utilização de middlewares na aplicação.
 * Poderia ser utilizado para logar informações sobre as requisições feitas ao servidor.
 * Neste caso, ele loga o método, o caminho e o corpo da requisição, além de quanto tempo a requisição levou para ser finalizada.
 * Poderíamos utilizar a biblioteca fs para salvar esses logs em um arquivo, por exemplo.
*/
export const loggingMiddleware: MiddlewareType = async (body, method, path, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const elapsed = Date.now() - start;
        console.log(`${method} at ${path} with body ${JSON.stringify(body)} was finished with ${res.statusCode} in ${elapsed}ms`);
    });

    next();
}