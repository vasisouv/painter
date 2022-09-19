import { renderFile as renderEtaTemplate } from 'eta'
import renderMjmlTemplate from 'mjml'
import { Payload } from '~/types'
import { getDummyPayload } from '~/utils'

export async function renderEmail(
  templatePath: string,
  payload: Payload
): Promise<string> {
  try {
    const renderedEtaTemplate = await renderEtaTemplate(
      `/email/templates/${templatePath}.mjml`,
      payload
    )
    return renderMjmlTemplate(renderedEtaTemplate).html
  } catch (error) {
    error.message = `Failed to render email ${templatePath} - ${error.message}`
    throw error
  }
}

export function renderEmailWithDummyData(
  templatePath: string
): Promise<string> {
  return renderEmail(
    templatePath,
    getDummyPayload(templatePath, 'src/views/email/templates')
  )
}
