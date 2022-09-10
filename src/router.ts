import express, { Request, Response } from 'express'
// import { render, renderWithDummyData } from './render'
import { createAsyncRoute } from '~/utils'
import { renderEmail } from '~/render/email'
import { BASE_API_PATH } from '~/constants'

const router = express.Router()

// Used for development
router.get(
  `${BASE_API_PATH}/:templatePath(*)`,
  createAsyncRoute(async (req: Request, res: Response) =>
    res.send(await renderEmail('example', {}))
  )
)

export default router
