import { configure as configureEta } from 'eta'
import { BASE_VIEWS_FILES_PATH } from '~/constants'

export function initializeEta(): void {
  configureEta({
    views: BASE_VIEWS_FILES_PATH,
    varName: 'd'
  })
}
