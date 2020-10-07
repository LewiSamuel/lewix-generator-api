const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
    /****************************/
    //
    //     VALIDATION FIELDS ( if exists )
    //
    /****************************/
    async ValidateFields(req, res, next){
        const { PhotoUrl, Descricao, idUser } = req.fields;


        // validation 'PhotoUrl'
        if(PhotoUrl){
            if(PhotoUrl.length < 6)
            return res.status(400).send({error: "PhotoUrl size cannot be less than 6"});

            if(PhotoUrl.length > 500)
            return res.status(400).send({error: "PhotoUrl size cannot be greater than 500"});
        }

        // validation 'Descricao'
        if(Descricao){
            if(Descricao.length < 6)
            return res.status(400).send({error: "Descricao size cannot be less than 6"});

            if(Descricao.length > 5000)
            return res.status(400).send({error: "Descricao size cannot be greater than 5000"});

        }

        // validation 'idUser'
        if(idUser){
            const resultUser = await User.count({ where: { id: idUser }});
                
            if(resultUser === 0)
            return res.status(400).send({error: "User does not exist"});
        }
    
  
        next();
    },



    /****************************/
    //
    //      POST LIST
    //
    /****************************/
    async list(req, res, next){ 
        
        next();
    },


    /****************************/
    //
    //      POST LISTONE
    //
    /****************************/
    async listOne(req, res, next){
        const { id } = req.fields;

        if(!id)
        return res.status(400).send({error: "id is required"});

        next();
    },


    /****************************/
    //
    //      POST SAVE
    //
    /****************************/
    async save(req, res, next){
        const { Descricao, idUser } = req.fields;
        
        if(!Descricao)
        return res.status(400).send({error: "Descricao is required"});

        if(!idUser)
        return res.status(400).send({error: "idUser is required"});
        
        next();
    },



    /****************************/
    //
    //      POST UPDATE
    //
    /****************************/
    async update(req, res, next){
        const { id } = req.fields;
        
        if(!id)
        return res.status(400).send({error: "id is required"});
        
        next();
    },

    /****************************/
    //
    //      POST DELETE
    //
    /****************************/
    async delete(req, res, next){
        const { id } = req.fields;

        if(!id)
        return res.status(400).send({error: "id is required"});

        next();
    }
}