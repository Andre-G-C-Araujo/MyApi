const fs = require("fs"); // lida com manipulaçao de arquivos
const path = require("path"); //diretorios
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      // rename - renomea ou troca o destino
      //primeiro paramtro, pega(busca) o file aonde esta, segundo parametro nome do arquivo (file)
      path.resolve(uploadConfig.TMP_FOLDER, file),
      //para onde vai e quem vai
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
