const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next) => { 
    // get header authorization
    const authHeader = req.headers.authorization;

    // Erro caso nao tenha sido passado um token
    if(!authHeader)
        return res.status(401).send({ error: 'No Token Provided'});
    
    // Splitar Token
    const parts = authHeader.split(' ');

    // Erro Se não houver duas partes distintas apos o split
    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token Error' }); 
    
    // pega as duas partes do Token
    const [ scheme, token ] = parts; 

    // Erro ao nao existir 'Bearer'no token
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malfomatted' });
    
    jwt.verify( token, process.env.AUTH_CONFIG_SECRET, (err, decoded) => {
        if(err)
            return res.status(401).send({ error: 'Token invalid' }); 
        
        req.userId = decoded.id;
        return next();

    });

}