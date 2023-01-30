import { GSheetsService } from "../services/gsheets.service.js";

class GoRepository {
  /**
   *
   * @param {GSheetsService} gSheetsService
   */
  constructor(gSheetsService, cacheTimeoutSecs) {
    this.gsheetsService = gSheetsService;
    this.cacheTimeoutSecs = cacheTimeoutSecs;
    this.cache = {};
  }

  async getLinks() {
    const data = this.#getFromCacheOrNull("links");
    if (!!data) return data;

    const rows = await this.gsheetsService.getLinksRows();
    const links = rows.map((it) => ({
      label: it.label,
      link: it.link,
      hoverHint: it.hover_hint,
      bgColour: it.bg_colour,
      iconUrl: it.icon_url,
    }));

    this.#saveToCache("links", links);

    return links;
  }

  async getRedirects() {
    const data = this.#getFromCacheOrNull("redirects");
    if (!!data) return data;

    const rows = await this.gsheetsService.getRedirectsRows();
    const redirects = {};
    for (let row of rows) {
      redirects[row.key] = row.link;
    }

    this.#saveToCache("redirects", redirects);

    return redirects;
  }

  #getFromCacheOrNull(key) {
    const cacheEntry = this.cache[key];
    // If no cache entry exists for key, or cached data is too old
    if (!!cacheEntry || cacheEntry.createdAt + this.cacheTimeoutSecs * 1_000 < Date.now()) {
      return null;
    } 

    return this.cache[key].data;
  }

  #saveToCache(key, data) {
    this.cache[key] = {
      createdAt: Date.now(),
      data: data,
    }
  }
}

export { GoRepository };
