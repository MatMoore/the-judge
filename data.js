class ScoreDatabase {
  constructor(client) {
    this.client = client;
  }

  async scores() {
    const query = "select username, score from scores order by score desc";
    const result = await this.client.query(query);
    return result;
  }

  async increment(userId, username, amount) {
    const query = `
      insert into scores(id, username, score)
      values($1, $2, $3)
      on conflict(id) do update
      set username=$2, score=scores.score+$3 where scores.id=$1
    `;

    await this.client.query(query, [userId, username, amount]);
  }
}

module.exports = { ScoreDatabase };
