import { renderFile as renderEtaTemplate } from 'eta'
import renderMjmlTemplate from 'mjml'
import { Payload } from '~/types'
import { existsSync, readFileSync } from 'fs'

export async function renderEmail(
  templatePath: string,
  payload: Payload
): Promise<string> {
  try {
    const renderedEtaTemplate = await renderEtaTemplate(
      `/templates/${templatePath}.mjml`,
      payload
    )
    return renderMjmlTemplate(renderedEtaTemplate).html
  } catch (error) {
    error.message = `Failed to render ${templatePath} - ${error.message}`
    throw error
  }
}

export function renderEmailWithDummyData(
  templatePath: string
): Promise<string> {
  let payload = {}
  const dummyJsonFilePath = `src/views/email/templates/${templatePath}.json`
  if (existsSync(dummyJsonFilePath)) {
    // loads dummy .json file as payload
    payload = JSON.parse(readFileSync(dummyJsonFilePath, 'utf-8'))
  }
  return renderEmail(templatePath, payload)
}
