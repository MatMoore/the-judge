class ScoreFetcher {
  constructor(client) {
    this.client = client;
  }

  async scores() {
    const query = "select username, score from scores";
    const result = await this.client.query(query);
    return result;
  }

  async increment(username, amount) {}
}

module.exports = { ScoreFetcher };
