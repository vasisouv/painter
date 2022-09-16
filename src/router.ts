import express, { Request, Response } from 'express'
import { createAsyncRoute, getEmailTemplatePath } from '~/utils'
import { renderEmail, renderEmailWithDummyData } from '~/render/email'
import { BASE_API_PATH, IS_DEV_ENV } from '~/constants'

const router = express.Router()

if (IS_DEV_ENV) {
  // Used for development
  router.get(
    `${BASE_API_PATH}/:templatePath(*)`,
    createAsyncRoute(async (req: Request, res: Response) =>
      res.send(await renderEmailWithDummyData(getEmailTemplatePath(req.url)))
    )
  )
}

router.post(
  `${BASE_API_PATH}/:templatePath(*)`,
  createAsyncRoute(async (req: Request, res: Response) =>
    res.send(await renderEmail(getEmailTemplatePath(req.url), req.body))
  )
)

export default router
