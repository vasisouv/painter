import { Request, Response } from 'express'
import { BASE_EMAIL_API_PATH, BASE_PDF_API_PATH } from '~/constants'
import { existsSync, readFileSync } from 'fs'

// This is required since express 4.x can't handle async route errors
export const createAsyncRoute =
  (fn: any) =>
  (req: Request, res: Response, next: any, ...args: any) =>
    Promise.resolve(fn(req, res, next, ...args)).catch(next)

export function getEmailTemplatePath(requestUrl: Request['url']): string {
  return requestUrl.replace(BASE_EMAIL_API_PATH, '')
}

export function getPdfTemplatePath(requestUrl: Request['url']): string {
  return requestUrl.replace(BASE_PDF_API_PATH, '')
}

export function getDummyPayload(templatePath: string, basePath: string) {
  let payload = {}
  const dummyJsonFilePath = `${basePath}/${templatePath}.json`
  if (existsSync(dummyJsonFilePath)) {
    // loads dummy .json file as payload
    payload = JSON.parse(readFileSync(dummyJsonFilePath, 'utf-8'))
  }

  return payload
}
