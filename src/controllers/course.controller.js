'use strict'
const Course = require("../models/course.model")


const createCourse = async(req,res)=>{
    if(req.user.rol ==="MAESTRO"){
        const {section} = req.body
    try{
        let course = await Course.findOne({section})
        if(course){
            return res.status(400).send({
                ok: false,
                message: 'seccion existente',
                course: course
            })
        }
        course = new Course(req.body)
        course = await course.save()

    }catch(er){
        throw new Error (er)
    }
    }else{
        return res.status(400).send({message:"opcion no disponible para alumnos"})
    }
    
}

const listCourse = async(req,res)=>{
    try{
        const courses = await Course.find()
        if(!courses){
            return res.status(400).send({message: 'no hay cursos disponibles'})
        }else{
            return res.status(200).send({courses})
        }
    }catch(er){
        throw new Error(er)
    }
}

const updateCourse = async(req,res)=>{
    if(req.user.rol ==="MAESTRO"){
        try{
            const id = req.params.id
            const courseEdit = {...req.body}
            const courseUpdate = await Course.findByIdAndUpdate(id,courseEdit,{new: true})
            if(courseUpdate){
                return res.status(200).send({
                    message: 'curso actualiado',
                    courseUpdate
                })
            }else{
                res.status(400).send({message: 'este curso no existe'})
            }
        }catch(er){
            throw new Error(er)
        }
    }else{
        return res.status(400).send({
            message: 'opcion no dislponible para alumnos'
        })
    }
    
}

const aalumno = async(req,res)=>{
    try{
        const id= req.params.id
        const {name, lastName} = req.body
        const useAlumno = await Course.findByIdAndUpdate(id,
            {
                $push: {
                    Students:{
                        name: name,
                        lastNmae: lastName,
                    },
                },
            },
            {new: true}
            
        )
        if(!useAlumno){
            return res.status(400).send({message: 'alumno no encontrado'})
        }
        return res.status(200).send({useAlumno})
    }catch(error){
        throw(error)
    }
}

const deleteCourse = async(req,res)=>{
    if(req.user.rol==="MAESTRO"){
        try{
            const id = req.params.id
            const CourseDel = await Course.findByIdAndDelete(id)
            return res.status(200).send({message:'curso eliminado'})
        }catch(er){ 
            throw new Error(er)
        }
    }else{return res.status(400).send({
        message: 'opcion no disponible para alumnos'
    })}
   
}


module.exports = {createCourse,listCourse, updateCourse, deleteCourse, aalumno}