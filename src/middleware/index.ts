import { Injectable, NestMiddleware } from '@nestjs/common'
import {Request, Response, NextFunction} from 'express'


@Injectable()
export class Logger implements NestMiddleware{
    use(req:Request, res:Response, next:NextFunction) {
        // res.send('我呗拦截了')
        next()
    }
}