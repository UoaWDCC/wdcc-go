import { GoogleSpreadsheet } from "google-spreadsheet";

class GSheetsService {
  constructor(sheetId, credentials) {
    this.client = new GoogleSpreadsheet(sheetId);
    this.credentials = credentials;
    this.isLoaded = false;
  }

  async init() {
    await this.client.useServiceAccountAuth(this.credentials);
    await this.client.loadInfo();
  }

  async getLinksRows() {
    return await this.client.sheetsById[0].getRows();
  }

  async getRedirectsRows() {
    return await this.client.sheetsById[841084673].getRows();
  }
}

export { GSheetsService };
