import express from 'express'
import router from '~/router'
import { initializeEta } from '~/vendors'

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
    return this
  }

  initializeVendors(): App {
    initializeEta()
    return this
  }

  listen(): express.Application {
    // TODO: handle errors
    this.app.listen(3000, () => {})

    return this.app
  }
}

export default App
