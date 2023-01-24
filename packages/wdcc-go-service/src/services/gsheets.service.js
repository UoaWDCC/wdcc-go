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
    const linksSheet = this.client.sheetsById[0];
    const rows = await linksSheet.getRows();
    return rows;
  }
}


export {
  GSheetsService
}