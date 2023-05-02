const Jimp = require("jimp");

const resize = (imgPath) => {
  Jimp.read(imgPath)
    .then((image) => {
      return image.resize(250, 250).write(imgPath);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = resize;
