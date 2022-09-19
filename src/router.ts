import express, { Request, Response } from 'express'
import {
  createAsyncRoute,
  getEmailTemplatePath,
  getPdfTemplatePath
} from '~/utils'
import { renderEmail, renderEmailWithDummyData } from '~/render/email'
import { BASE_EMAIL_API_PATH, BASE_PDF_API_PATH, IS_DEV_ENV } from '~/constants'
import { renderPdfWithDummyData } from '~/render/pdf'

const router = express.Router()

if (IS_DEV_ENV) {
  // Used for development
  router.get(
    `${BASE_EMAIL_API_PATH}/:templatePath(*)`,
    createAsyncRoute(async (req: Request, res: Response) =>
      res.send(await renderEmailWithDummyData(getEmailTemplatePath(req.url)))
    )
  )
  router.get(
    `${BASE_PDF_API_PATH}/:templatePath(*)`,
    createAsyncRoute(async (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/pdf')
      return res.send(await renderPdfWithDummyData(getPdfTemplatePath(req.url)))
    })
  )
}

router.post(
  `${BASE_EMAIL_API_PATH}/:templatePath(*)`,
  createAsyncRoute(async (req: Request, res: Response) =>
    res.send(await renderEmail(getEmailTemplatePath(req.url), req.body))
  )
)

export default router
