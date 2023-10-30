const { hash, compare } = require("bcryptjs");

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
const { ERROR } = require("sqlite3");

class UserControllers {
  /*
  Controller no maximo utiliza 5 metodos.
  se controller tiver mais de 5 metodos. utilizar um controller a parte para realizar essa funçao
   *index = GET para listar varios regitros.
   *show - GET para exibir um registro especifico.
   *create - POST para criar um registro.
   *update - PUT para atualizar um registro.
   *delete - DELETE para remover um registro
   */
  async create(req, res) {
    const { name, email, password } = req.body;
    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Este e-mail já esta em uso");
    }
    const hashedPassword = await hash(password, 8);

    await database.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );

    return res.status(201).json();

    // if (!name) {
    //   throw new AppError("O nome é obrigatório!");
    // }

    // res.status(201).json({ name, email, password });
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

    if (!user) {
      throw new AppError("Usuario nao encontrado");
    }

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Voce precisa informar a antiga senha!, para definar a nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `UPDATE or IGNORE users SET name = ?, email = ?,password = ?, update_at = DATETIME('now'), id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return res.json();
  }
}

module.exports = UserControllers;
