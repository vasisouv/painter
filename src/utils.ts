import { Request, Response } from 'express'
import { BASE_EMAIL_API_PATH } from '~/constants'

// This is required since express 4.x can't handle async route errors
export const createAsyncRoute =
  (fn: any) =>
  (req: Request, res: Response, next: any, ...args: any) =>
    Promise.resolve(fn(req, res, next, ...args)).catch(next)

export function getEmailTemplatePath(requestUrl: Request['url']): string {
  return requestUrl.replace(BASE_EMAIL_API_PATH, '')
}
