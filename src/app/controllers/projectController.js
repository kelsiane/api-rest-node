const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router();

const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
router.use(authMiddleware);



router.post('/', async function (req, res, next) {
    try {
        const {
            title,
            description,
            tasks
        } = req.body;
        const project = await Project.create({
            title,
            description,
            user: req.userId
        })
        await Promise.all(tasks.map(async function (task) {
            const projectTask = new Task({
                ...task,
                project: project._id
            })
            await projectTask.save();
            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.send({
            project
        })
    } catch (err) {
        return res.status('400').send('Project not create!!' + err);
    }
})
router.get('/', async function (req, res, next) {
    //populate mostar as informações do user 
    try {
        // [] 
        const projects = await Project.find().populate(['user', 'tasks']);
        res.send({
            projects
        });
    } catch (err) {
        res.status('400').send("Erro list of projects" + err);
    }
})

router.get('/:projectId', async function (req, res, next) {
    //populate mostar as informações do user 
    try {
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);
        res.send({
            project
        });
    } catch (err) {
        res.status('400').send("Erro list of project" + err);
    }
})

router.put('/:projectId', async function (req, res, next) {
    //populate mostar as informações do user 
    try {
        const {title, description, tasks} = req.body;
        const project = await Project.findByIdAndUpdate(req.params.projectId,{
            
            title, 
            description
            //new true pro mongoose retornar o novo user
        }, {new:true});

        project.tasks = [];
        await Task.remove({project:project._id})
        await Promise.all(tasks.map(async function (task) {
            const projectTask = new Task({
                ...task,
                project: project._id
            })
            await projectTask.save();
            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.send({
            project
        })
    }   
     catch (err) {
        res.status('400').send("Erro update of project" + err);
    }
})
router.delete('/:projectId', async function (req, res, next) {
    try {
        await Project.findByIdAndRemove(req.params.projectId);
        res.send();
    } catch (err) {
        res.status('400').send("Erro delete the project" + err);
    }
})

// const TAMANHO_PAGINA = 2;


// router.get('/pag', async function (req,res){
//    function findAll(pagina, callback){  
//         const tamanhoSkip = TAMANHO_PAGINA * (pagina - 1);
//         global.conn.collection("project").find({})
//                                            .skip(tamanhoSkip)
//                                            .limit(TAMANHO_PAGINA)
//                                            .toArray(callback);
//     }

// })

module.exports = function (app) {
    app.use('/projects', router)
}