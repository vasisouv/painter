import express, { Request, Response } from 'express'
// import { render, renderWithDummyData } from './render'
import { createAsyncRoute } from '~/utils'
import { renderEmail } from '~/render/email'

const router = express.Router()

// Used for development
router.get(
  '/:templatePath(*)',
  createAsyncRoute(
    async (req: Request, res: Response) => {
      const t = await renderEmail('test', {})
      return res.send('hello route')
    }
    // res.send(await renderWithDummyData(req.params.templatePath))
  )
)

export default router
