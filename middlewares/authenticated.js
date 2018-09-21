var jwt = require('jwt-simple');
var moment = require('moment');
var momentTimezone = require('moment-timezone');
var secret = 'clave_secreta_';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticación'});
    } else {
        var token = req.headers.authorization.replace(/['"]+/g, '');
        try{
            var payload = jwt.decode(token, secret);            
            if(payload.exp <= momentTimezone().tz('America/Bogota').unix()){
                return res.status(401).send({
                    message: 'EL token ha expirado'
                });
            }
        } catch (ex){
            return res.status(404).send({
                message: 'EL token no es valido'
            });
        }
        req.user = payload;
        next();
    }
}

exports.generateToken = function (user) {
    let fecha = momentTimezone().tz('America/Bogota');
    const payload = {
        sub: user.username,
        id: user.id,
        //roles: usuario.roles,
        iat: fecha.unix(),
        exp: fecha.add(1, 'days').unix()
    }
    return jwt.encode(payload, secret);
};