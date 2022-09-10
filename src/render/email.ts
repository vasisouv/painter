import { renderFile as renderEtaTemplate } from 'eta'
import renderMjmlTemplate from 'mjml'
import { Payload } from '~/types'

export async function renderEmail(
  templatePath: string,
  payload: Payload
): Promise<string> {
  try {
    const renderedEtaTemplate = await renderEtaTemplate(
      `templates/${templatePath}.mjml`,
      payload
    )
    if (!renderedEtaTemplate) {
      throw new Error(`Rendered empty template for ${templatePath}`)
    }
    return renderMjmlTemplate(renderedEtaTemplate).html
  } catch (error) {
    error.message = `Failed to render ${templatePath} - ${error.message}`
    throw error
  }
}
