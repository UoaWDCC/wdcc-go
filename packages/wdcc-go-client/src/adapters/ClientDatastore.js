class ClientDatastore {
  static #ds = null;
  static getInstance() {
    if (ClientDatastore.#ds === null) {
      ClientDatastore.#ds = new ClientDatastore();
    }

    return ClientDatastore.#ds;
  }

  constructor() {
    this.redirects = null;
    this.links = null;
  }

  async init() {
    const resp = await fetch("/go", { method: "GET" });

    if (resp.ok) {
      const data = await resp.json();
      this.links = data.links;
      this.redirects = data.redirects;

      console.log("data", data);
    } else {
      this.links = [];
      this.redirects = {};
    }
  }

  async getLinks() {
    if (this.links === null) {
      await this.init();
    }

    return this.links;
  }

  async getRedirects() {
    if (this.redirects === null) {
      await this.init();
    }

    return this.redirects;
  }
}

export { ClientDatastore };
