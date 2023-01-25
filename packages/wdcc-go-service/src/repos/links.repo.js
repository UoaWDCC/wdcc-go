import { GSheetsService } from "../services/gsheets.service.js";

class LinksRepository {
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
      iconUrl: it.icon_url
    }));
  }
}

export { LinksRepository };
