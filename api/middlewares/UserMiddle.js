const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
    /****************************/
    //
    //     VALIDATION FIELDS ( if exists )
    //
    /****************************/
    async ValidateFields(req, res, next){
        const { Nome, Email, Senha, Telefone } = req.fields;

        // validation 'Nome'
        if(Nome){
            if(Nome.length < 6)
            return res.status(400).send({error: "Nome size cannot be less than 6"});

            if(Nome.length > 60)
            return res.status(400).send({error: "Nome size cannot be greater than 60"});
        }
    
        // validation 'Email'
        if(Email){
            if(Email.length < 10)
            return res.status(400).send({error: "Email size cannot be less than 6"});

            if(Email.length > 80)
            return res.status(400).send({error: "Email size cannot be greater than 60"});
            
            if(!Email.includes("@") || !Email.includes("."))
            return res.status(400).send({error: "Email invalid"});

        }

        // validation 'Telefone'
        if(Telefone){

            if(Telefone.length < 6)
            return res.status(400).send({error: "Telefone size cannot be less than 6"});
        
            if(Telefone.length > 60)
            return res.status(400).send({error: "Telefone size cannot be greater than 60"});

        }

        // validation 'Senha'
        if(Senha){

            if(Senha.length < 6)
            return res.status(400).send({error: "Senha size cannot be less than 6"});
    
            if(Senha.length > 60)
            return res.status(400).send({error: "Senha size cannot be greater than 60"});
        }
       
        next();
    },


    /****************************/
    //
    //      USER AUTH
    //
    /****************************/
    async Authenticate(req, res, next){
        const { Email, Senha } = req.fields;

        // fields required
        if(!Email)
        return res.status(400).send({error: "Email is required"});

        if(!Senha)
        return res.status(400).send({error: "Senha is required"});

        next();
    },


    /****************************/
    //
    //      USER LIST
    //
    /****************************/
    async list(req, res, next){ 
        
        next();
    },


    /****************************/
    //
    //      USER LISTONE
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
    //      USER SAVE
    //
    /****************************/
    async save(req, res, next){
        const { Nome, Senha, Email } = req.fields;

        console.log(req.files)

        if(!Nome)
        return res.status(400).send({error: "Nome is required"});

        if(!Senha)
        return res.status(400).send({error: "Senha is required"});

        if(!Email)
        return res.status(400).send({error: "Email is required"});

        const resultUser = await User.count({ where: { email: Email }});
                
        if(resultUser !== 0)
        return res.status(400).send({error: "User already exists"});

        // criptography password
        req.fields.Senha = await bcrypt.hash(Senha, 3);

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const { PhotoImg } = req.files;
        // let sampleFile = req.files.sampleFile;

        // Use the mv() method to place the file somewhere on your server
        PhotoImg.mv('/storage/user/PhotoImg/filename.jpg', function(err) {
            if (err)
            return res.status(500).send(err);

            res.send('File uploaded!');
        });

        // get url img
        // if(PhotoImg)
        // req.fields.PhotoImg = "/user/photoimg/" + req.file.key;
        
        next();
    },



    /****************************/
    //
    //      USER UPDATE
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
    //      USER DELETE
    //
    /****************************/
    async delete(req, res, next){
        const { id } = req.fields;

        if(!id)
        return res.status(400).send({error: "id is required"});

        next();
    }
}