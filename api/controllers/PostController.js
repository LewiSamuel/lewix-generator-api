const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {

  
    /****************************/
    //
    //      POST LIST
    //
    /****************************/

    async list(req, res){ 
        
        await Post.findAll({
            order: [
                ['id', 'ASC'],
            ],
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['Senha']
                    }
                }
            ],
            where: req.fields
        }).then(result => {
            return res.send(result);
        }).catch(err => {
            return res.send("NOT FOUND");
        })
    },




    /****************************/
    //
    //      POST LISTONE
    //
    /****************************/

    async listOne(req, res){
        await Post.findOne({
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['Senha']
                        }
                    }
                ],
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
    //      POST SAVE
    //
    /****************************/
    async save(req, res){
        // Update
            await Post.create( req.fields ).then(result => {

                if(result)
                return res.send({status: "OK", obj_save: result });
                else
                return res.send({status: "ERRO", obj_save: result });
            }).catch(err => {
                return res.send({err: err});
            });
        
    },


    /****************************/
    //
    //      POST UPDATE
    //
    /****************************/
    async update(req, res){
        
        await Post.update( req.fields ,{
            where: { id: req.fields.id}
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
    //      POST DELETE
    //
    /****************************/

    async delete(req, res){

        let objExcluir = await Post.findOne({where: {id: req.fields.id}}).catch(function(erro){
            return res.status(400).send("Erro: "+erro);
        });
        if(objExcluir.destroy())
        return res.send({status: "OK", obj: objExcluir});
        else
        return res.status(400).send({status: "ERRO", obj: objExcluir});
    }

}