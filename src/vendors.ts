import { configure } from 'eta'
import { BASE_VIEWS_PATH } from '~/constants'

export function initializeEta() {
  configure({
    views: BASE_VIEWS_PATH,
    varName: 'd'
  })
}
