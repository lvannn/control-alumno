'use strict'
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const { generateJWT } = require("../helpers/create-jwl")

const createUser = async(req,res)=>{
    if(req.user.rol==="MAESTRO"){
        const{name,email, password}=req.body 
    try{

        let user = await User.findOne({email: email})
        if(user){
            return res.status(400).send({
                ok: false,
                message: 'correo ya utlizado',
                user: user,
            }) 
    
            }
            user = new User(req.body)
            const saltos = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, saltos);
            user = await user.save()
            const token = await generateJWT(user.id, user.name, user.email);
            res.status(400).send({
                message: `bienvenido ${name}`,
                user,
                token,
            })
       
    }catch(error){
    throw new Error(error)
    }
    }else{
        return res.status(400).send({
            message: 'opcion no disponible para alumnos'
        })
    }
    
}

const readUser = async(req,res) =>{
    try{
        const users = await User.find()

        if(!users){
            res.status(400).send({
                message: 'no hay usuarios'
            })
        }else{
            res.status(200).send({usuario: users})
        }
    }catch(error){
        throw new Error(error)
    }
}

const updateUser = async (req,res)=>{
    if(req.user.rol ==="MAESTRO"){
        try{
            const id = req.params.id;
            const userEdit = { ...req.body };
      
            userEdit.password = userEdit.password
            ? bcrypt.hashSync(userEdit.password, bcrypt.genSaltSync())
            : userEdit.password;
          const userComplete = await User.findByIdAndUpdate(id, userEdit, {
            new: true,
          });
            if(userComplete){
                const token = await generateJWT(userComplete.id, userComplete.name,userComplete.email)
                return res.status(200).send({message: 'se actualizaron los datos', userComplete, token})
            }else{
                res.status(404).send({message: 'no existe en la base de datos o existe un error'})
            }
        
        }catch(error){
            throw new Error(error)
        }
    }else{
         res.status(400).send({
            message: "esta opcion no esta disponible para alumnos"
         })
    }
    
}

const deleteUser = async(req,res) =>{
    if(req.user.rol==="MAESTRO"){
        try{
            const id = req.params.id
            const userDelete = await User.findByIdAndDelete(id)
            res.status(200).send({message: 'elimnado correctamente', userDelete})
        }catch(error){
            throw new Error(error)
        }
    }else{
        res.status(400).send({
            message: "opcion no disponible para alumnos"
        })
    }
    
}

const loginUser = async(req,res)=>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({
                ok: false,
                message:'usuario no existe'
            })
        }
        const validPassword = bcrypt.compareSync(
            password, user.password
        )
        if(!validPassword){
            return res.status(400).send({
                ok: false,
                message:'password incorrecto'
            })
        }
        const token = await generateJWT(user.id, user.name, user.email)
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })
    }catch(er){
    res.status(500).json({
        ok: false,
        message: 'usuario no registrado'
    })
    }
    
}

module.exports={createUser, readUser, updateUser, deleteUser, loginUser}