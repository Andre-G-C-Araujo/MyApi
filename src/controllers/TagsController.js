const knex = require("../database/knex");

class TagsController {
  async index(req, res) {
    const { user_id } = req.params;
    console.log(user_id);

    const tags = await knex("tags").where({ user_id });

    return res.json(tags);
  }
}

module.exports = TagsController;
