import { renderFile as renderEtaTemplate } from 'eta'
import { Payload } from '~/types'

export async function renderEmail(
  templatePath: string,
  payload: Payload
): Promise<string> {
  try {
    const renderedEtaTemplate = await renderEtaTemplate(
      `${templatePath}.mjml`,
      payload
    )
    if (!renderedEtaTemplate) {
      throw new Error(`Rendered empty template for ${templatePath}`)
    }
    // const renderedMjmlTemplate = renderMjmlTemplate(renderedEtaTemplate)
    // return renderedMjmlTemplate.html
    console.log('rendered eta template', renderedEtaTemplate)
  } catch (error) {
    error.message = `Failed to render ${templatePath} - ${error.message}`
    throw error
  }
}
