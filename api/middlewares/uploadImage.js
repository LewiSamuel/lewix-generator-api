const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
var fs = require('fs');

function string_to_slug (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

// tipos de armazenamento
const storageTypes = {
    local: function( entidade, field ){
    // criar diretorio caso nao exista   
    if (!fs.existsSync(path.resolve(__dirname, "..", "..", "storage", entidade ) )){
        fs.mkdirSync(path.resolve(__dirname, "..", "..", "storage", entidade ) );
    }
    // criar diretorio caso nao exista
    if (!fs.existsSync(path.resolve(__dirname, "..", "..", "storage", entidade, field ) )){
        fs.mkdirSync(path.resolve(__dirname, "..", "..", "storage", entidade, field ) );
    }

    return multer.diskStorage({
      // destino
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "..", "..", "storage", entidade, field));
      },
      // nome do arquivo
      filename: (req, file, cb) => {
        console.log(req.files)
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err);
          console.log(file)
          // gerar nome do arquivo ( hash + nome original )
          file.key = `${hash.toString("hex")}-${string_to_slug(file.originalname)}.${file.mimetype.replace("image/","")}`;
  
          cb(null, file.key);
        });
      }
    })
  }
};

module.exports = function( entidade, field ){

  return {
    storage: storageTypes.local( entidade, field ),
    limits: {
      fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif"
      ];
  
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type."));
      }
    }
  }
};