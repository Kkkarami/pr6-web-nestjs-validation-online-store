import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const startTime = Date.now();
        res.on('finish', () => {
            const httpMethod = req.method;
            const url = req.originalUrl;
        	const statusCode = res.statusCode;
            const clientIp = req.ip;
            const duration = Date.now() - startTime;
            this.logger.log(`[HTTP] ${httpMethod} ${url} ${statusCode} +${duration}ms IP: ${clientIp}`);
        });
        next();
    }
    private readonly logger = new Logger(HttpLoggerMiddleware.name);
}