import express from 'express'
import router from '~/router'
import { initializeEta } from '~/vendors'
import { config as configDotEnv } from 'dotenv'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
  }

  bootstrap(): App {
    this.app.use(router)
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.initializeVendors()
    configDotEnv()
    // TODO: add error middleware here

    return this
  }

  initializeVendors(): App {
    initializeEta()
    return this
  }

  listen(): express.Application {
    const port = process.env.PORT || 3000
    this.app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`)
    })

    return this.app
  }
}

export default App
