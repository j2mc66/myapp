var User = require('../models/user');
var bcrypt = require('bcrypt');
var auth = require('../middlewares/authenticated');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

exports.login = function (req, res) {
    let url = req.url;
    let user = req.body;
    if (user && user.username && user.password) {
        User.findOne({ 'username': user.username }, (err, userdb) => {            
            if (err || !userdb) {
                return res.status(401).json("Usuario o contraseña invalidos.");
            } else if (userdb.status && userdb.status == 'active') {
				bcrypt.compare(user.password, userdb.password, function(err, isCorrect) {
					if (err || !isCorrect) {
                        res.status(401).json("Usuario o contraseña invalidos.");
                    } else {
                        /*Permiso.find({ $and: [{ 'rol': { $in: userdb.roles }, 'recurso': url }] }, (err, permisosdb) => {
                            if (err || !permisosdb || permisosdb.length <= 0) {
                                return res.status(401).json("Usuario no autorizado.");
                            }*/
                            let tokenJWT = auth.generateToken(userdb);
                            return res.status(200).json({ token: tokenJWT });
                       // });
                    }
				});
            } else {
                res.status(401).json("Usuario inactivo.");
            }
        });
    } else {
        res.status(400).json("Datos de entrada incorrectos.");
    }
}

exports.list = function(req, res) {
    var users ;
	User.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
};

exports.save = function(req, res) {
    const data = req.body;
    bcrypt.hash(data.password, 10, function(err, hashedPassword) {
        data.password = hashedPassword;
        User.create(data)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            //logger.error(err);
            res.status(500).send(err);
        });
    });
};

exports.update = function(req, res) {

    User.findByIdAndUpdate({ _id: req.params.id },req.body, { new: true })
		.then(user => {
			if (!user) {
				return res.sendStatus(404);
			}

			res.json(user);
		})
		.catch(err => {
			//logger.error(err);
			res.status(422).send(err.errors);
		});
}

exports.findById = function(req, res) {
    
    const id = req.params.id;

	User.findById(id)
		.then(user => {
			return res.json(user);
		})
		.catch(err => {
            console.log(err)
			res.status(422).send(err.errors);
		});
};

exports.delete = function(req, res) {
    
    User.findByIdAndRemove({ _id: req.params.id })
		.then(user => {
			const response = {
                message: "Successfully deleted",
                id: user._id
            };
            return res.status(200).send(response);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err.errors);
		});
}

exports.findByNameAndAge = function(req, res) {
    //User.where("name").equals(req.params.name).and("age").gte(req.params.age)
    User.find({ name: req.params.name, age: {$gte: req.params.age}})
		.then(users => {
			res.json(users);
            return res.status(200).send(res);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err.errors);
		});
}

exports.uploads = function(req,res) {

    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../uploads');
    form.keepExtensions = true;
    form.maxFileSize = 16106127360;// 1.5 * 1024 * 1024 * 1024; //1.5 GB
    
    form.parse(req, function (err, fields, file) {

        if (err) {
          console.error(`Error al cargar el archivo: ${err}`);
          return res.status(500).send(`Error al cargar el archivo: ${err}`);
        } else {
    
          if(file == undefined){
            console.error(`Error al cargar el archivo: debe adjuntar un archivo`);
            return res.status(500).send(`Error al cargar el archivo: debe adjuntar un archivo`);
          }
          let fileUpload = file.fileupload;
          let errores = [];//validacionArchivo(file);
          if (!errores || errores.length > 0) {
            return res.status(500).send(`Error al cargar el archivo: (validacion Archivo) ${errores}`);
          } else {
              let fileName = fileUpload.name; // fileupload -> name html
                fs.rename(fileUpload.path, path.join(form.uploadDir, fileName), (err) => {
                if (err) {
                    console.error(`Error guardando el archivo: ${err}`);
                    return res.status(500).send(`Error al cargar el archivo: ${err}`);
                } else {
                    return res.status(200).send(`File ${fileName} upload`);
                }
              });           
          }
        }
    });
}

exports.mycalback = function(req, res){
    var numero = 3;
    factorial(numero)
        .then(resultado => {
            console.log(resultado);
            res.status(200).json('factorial ' + numero );
        })
}
//------------promesas----------------

async function factorial(numero) {
	try{
        if(numero > 1){
            let resultado = numero * await factorial(numero - 1);
            console.log(resultado);
            return resultado
        }else{
            return 1;
        }
    }catch(error) {
        console.log(error);
    }
}