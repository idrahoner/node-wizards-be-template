const Jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');

const removeOldAvatar = async (file, directory) => {
  const [name] = file.filename.split('.');
  const files = await fs.readdir(directory);
  files.forEach(async (file) => {
    if (file.includes(name)) {
      await fs.rm(path.join(directory, file));
    }
  });
};

const saveAvatarToStorage = async (file) => {
  const permamentImageStorage = path.join(__dirname, '../public/avatars');
  const oldImagePath = path.join(__dirname, '../', file.path);
  const newImagePath = path.join(permamentImageStorage, file.filename);

  await removeOldAvatar(file, permamentImageStorage);
  const image = await Jimp.read(oldImagePath);
  image.scaleToFit(250, 250).write(oldImagePath);
  await fs.rename(oldImagePath, newImagePath);
};

module.exports = { saveAvatarToStorage };
