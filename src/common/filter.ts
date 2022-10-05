import { ExceptionFilter, Catch, ArgumentsHost, HttpException} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class HttpFilter implements ExceptionFilter{
    catch(exception:HttpException, host:ArgumentsHost) {
        const ctx = host.switchToHttp()

        const request = ctx.getRequest<Request>()

        const reseponse = ctx.getResponse<Response>()

        const status = exception.getStatus()
        reseponse.status(status).json({
            success: false,
            time: new Date(),
            data:exception.message,
            status,
            path: request.url
        })

    }
}
