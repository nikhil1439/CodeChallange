const Emp = require('../models/user_details')
const mongoose = require('mongoose')
function create(req,res,next){
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
}
function view(req,res,next){
    Emp.find({}).then((data)=>{
        res.send(data)
    })
}

function update(req,res,next){
    Emp.findByIdAndUpdate(req.params.id,req.body, (err,emp)=>{
        if (err) {
            return res.status(500).send({error: "Problem with Updating the Employee recored "})
        };
        res.send({success: "Updation successfull"});
    })
}

function findOne(req,res){
  Emp.findOne({_id:req.params.id}).then((data)=>{
    res.send(data)})
}

function remove(req,res,next){
    Emp.findByIdAndDelete(req.params.id, (err,emp)=>{
        if(err){
            return res.status(500).send({error: "Problem with Deleting the Employee recored "})
        }
        res.send({success: 'Employee deleted successfully'})
    })
}

module.exports.create = create
module.exports.view = view
module.exports.update = update
module.exports.remove = remove
module.exports.findOne = findOne