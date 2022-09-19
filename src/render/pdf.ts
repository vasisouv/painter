import playwright from 'playwright'
import { Payload } from '~/types'
import { renderFile as renderEtaTemplate } from 'eta'
import { getDummyPayload } from '~/utils'

export async function renderPdf(
  templatePath: string,
  payload: Payload
): Promise<Buffer> {
  try {
    const browser = await playwright.chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    const renderedEtaTemplate = (await renderEtaTemplate(
      `/pdf/templates/${templatePath}.html`,
      payload
    )) as string
    await page.setContent(renderedEtaTemplate)
    const pdf = await page.pdf()
    await browser.close()
    return pdf
  } catch (error) {
    error.message = `Failed to render pdf ${templatePath} - ${error.message}`
    throw error
  }
}

export function renderPdfWithDummyData(templatePath: string): Promise<Buffer> {
  return renderPdf(
    templatePath,
    getDummyPayload(templatePath, 'src/views/pdf/templates')
  )
}
