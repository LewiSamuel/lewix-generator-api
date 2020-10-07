const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken');


require('dotenv/config');

// Função que gera um token que não expira nunca
function GenerateToken(idUser){
    return "Bearer " + jwt.sign({ id: idUser }, process.env.AUTH_CONFIG_SECRET, { });
}

module.exports = {

    /****************************/
    //
    //      GENERATE TOKEN
    //
    /****************************/
    getToken(req, res){
        return res.send({ token: "Bearer " + jwt.sign({ id: null }, process.env.AUTH_CONFIG_SECRET, { }) });
    },

    /****************************/
    //
    //      USER AUTH
    //
    /****************************/

    async Authenticate(req, res){

        // Get Variables
        const { Email, Senha } = req.fields;

        // Operation
        await User
                .findOne({
                     where: { Email: Email }
                    })
                .then(async user => {

                    // erro caso nao exista um usuario com este email
                    if(!user)
                        return res.status(400).send({error: "User not found"});

                    // erro caso as senhas nao batam 
                    if(!await bcrypt.compare(Senha, user.Senha))
                        return res.status(400).send({error: "Invalid password"});
                    
                    // gera Token
                    const token = GenerateToken(user.id);
                    
                    // retorna Usuario + token
                    return res.send({ user, token });

                });
    },


    /****************************/
    //
    //      USER LIST
    //
    /****************************/

    async list(req, res){ 

        await User.findAll({
            order: [
                ['id', 'ASC'],
            ],
            attributes: {
                exclude: ['Senha']
            },
            where: req.fields
        }).then(result => {
            return res.send(result);
        }).catch(err => {
            return res.send("NOT FOUND");
        })
    },




    /****************************/
    //
    //      USER LISTONE
    //
    /****************************/

    async listOne(req, res){

        // operation
        await User.findOne({
                attributes: {
                    exclude: ['Senha']
                },
                where: {
                id: req.params.id
            }
        }).then(result => {
            if(result)
            return res.send(result);
            else
            return res.send({err: "Not found"});
        }).catch(err => {
            return res.send({err: err});
        })
    },



    /****************************/
    //
    //      USER SAVE
    //
    /****************************/

    async save(req, res){
        
        // await User.create( req.fields ).then(result => {

        //     if(result)
        //     return res.send({status: "OK", obj_save: result, token: GenerateToken(result.id)});
        //     else
        //     return res.send({ status: "ERRO" });

        // }).catch(err => {
        //     return res.send({err: err});
        // })
        
        
    },

    /****************************/
    //
    //      USER UPDATE
    //
    /****************************/
    async update(req, res){

        if(req.fields.Senha)
        req.fields.Senha = await bcrypt.hash(req.fields.Senha, 3);

        await User.update( req.fields ,{
            where: { id: req.fields.id }
        }).then(result => {
            if(result)
            return res.send({status: "OK", obj_save: result});
            else
            return res.send({status: "ERRO", obj_save: result});
        }).catch(err => {
            return res.send({err: err});
        });
    },



    
    /****************************/
    //
    //      USER DELETE
    //
    /****************************/

    async delete(req, res){

        // operation
        let objExcluir = await User.findOne({where: {id: req.fields.id}}).catch(function(erro){
            return res.status(400).send("Erro: "+erro);
        });
        if(objExcluir.destroy())
        return res.send({status: "OK", obj: objExcluir});
        else
        return res.status(400).send({status: "ERRO", obj: objExcluir});
    }

}


