const express = require('express')

var router = express.Router()

const create = require('../controllers/users')

const bodyparser = require('body-parser');

router.use(bodyparser.json())

router.post('/create',create.create)

const view = require('../controllers/users')

const update = require('../controllers/users')

const remove = require('../controllers/users')

const findOne = require('../controllers/users')

const Emp = require('../models/user_details')



//router.use(bodyparser.json())

router.post('/create',function(req,res){
    let name = req.body.name;
    let department = req.body.department;
    let email = req.body.email;
    let emp = new Emp({
      name,
      department,
      email
    })
    emp.save().then((data)=>{
      res.send(data)
    })
  })

router.get('/',view.view)

router.get('/view/:id',findOne.findOne)

router.patch('/:id',update.update)

router.delete('/delete/:id',remove.remove)



module.exports = router;