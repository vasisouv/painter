import { Request, Response } from 'express'

// This is required since express 4.x can't handle async route errors
export const createAsyncRoute = (fn: any) =>
  function asyncUtilWrap(req: Request, res: Response, next: any, ...args: any) {
    const fnReturn = fn(req, res, next, ...args)
    return Promise.resolve(fnReturn).catch(next)
  }
