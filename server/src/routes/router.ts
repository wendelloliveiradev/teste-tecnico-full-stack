import { IncomingMessage, ServerResponse } from 'http';
import { URL } from 'url';
import { HttpMethod, MiddlewareType, Route, RouteHandler } from '../types/definitions.js';

export class Router {
    private routes: Route[] = [];
    private middlewares: MiddlewareType[] = [];

    // Register routes
    public addRoute(method: HttpMethod, path: string, handler: RouteHandler) {
        this.routes.push({ method, path, handler });
    }

    // Register middlewares
    public addMiddleware(middleware: MiddlewareType) {
        this.middlewares.push(middleware);
    }

    // Parse request body
    private async parseBody(req: IncomingMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                try {
                    resolve(body ? JSON.parse(body) : undefined);
                } catch (error) {
                    reject(error);
                }
            });
            req.on('error', reject);
        });
    }

    // Extract path parameters
    private extractPathParams(routePath: string, requestPath: string): Record<string, string> | null {
        const route_parts = routePath.split('/');
        const request_parts = requestPath.split('/');

        if (route_parts.length !== request_parts.length) return null;

        const params: Record<string, string> = {};

        for (let i = 0; i < route_parts.length; i++) {
            if (route_parts[i].startsWith('{') && route_parts[i].endsWith('}')) {
                const paramName = route_parts[i].slice(1, -1);
                params[paramName] = request_parts[i];
            } else if (route_parts[i] !== request_parts[i]) {
                return null;
            }
        }

        return params;
    }

    // Match route
    private matchRoute(method: string, path: string): { route: Route; params: Record<string, string> } | null {
        for (const route of this.routes) {
            const path_params = this.extractPathParams(route.path, path);
            if (route.method === method && path_params) {
                return { route, params: path_params };
            }
        }
        return null;
    }

    // Handle requests
    public async handleRequest(req: IncomingMessage, res: ServerResponse) {
        try {
            const url = new URL(req.url!, `http://${req.headers.host}`);
            const method = req.method as HttpMethod;
            const path = url.pathname;
            const body = method === 'POST' || method === 'PATCH' ? await this.parseBody(req) : undefined;

            let index = 0;
            const runMiddleware = async (): Promise<void> => {
                if (index < this.middlewares.length) {
                    await this.middlewares[index++](body, method, url, res, runMiddleware);
                } else {
                    const processRoute = async (req: IncomingMessage, res: ServerResponse) => {
                        // Encontra a rota compatível
                        const match = this.matchRoute(method, path);

                        if (!match) {
                            res.writeHead(404, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Not Found' }));
                            return;
                        }
                    
                        // Extrai os parâmetros da URL
                        const queryParams: Record<string, string> = {};
                        url.searchParams.forEach((value, key) => {
                            queryParams[key] = value;
                        });
                    
                        // Chama o handler da rota
                        await match.route.handler(req, res, {
                            queryParams,
                            pathParams: match.params,
                            body
                        });
                    }

                    await processRoute(req, res);
                };
            }
            await runMiddleware();
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }
}