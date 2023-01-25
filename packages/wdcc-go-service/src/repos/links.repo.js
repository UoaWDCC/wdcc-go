import { GSheetsService } from "../services/gsheets.service.js";

class GoRepository {
  /**
   *
   * @param {GSheetsService} gSheetsService
   */
  constructor(gSheetsService) {
    this.gsheetsService = gSheetsService;
  }

  async getLinks() {
    const rows = await this.gsheetsService.getLinksRows();

    return rows.map((it) => ({
      label: it.label,
      link: it.link,
      hoverHint: it.hover_hint,
      bgColour: it.bg_colour,
      iconUrl: it.icon_url,
    }));
  }

  async getRedirects() {
    const rows = await this.gsheetsService.getRedirectsRows();

    const redirects = {};
    for (let row of rows) {
      redirects[row.key] = row.link;
    }

    return redirects;
  }
}

export { GoRepository };
