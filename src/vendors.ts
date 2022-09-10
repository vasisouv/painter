import { configure } from 'eta'
import { BASE_VIEWS_FILES_PATH } from '~/constants'

export function initializeEta() {
  configure({
    views: BASE_VIEWS_FILES_PATH,
    varName: 'd'
  })
}
