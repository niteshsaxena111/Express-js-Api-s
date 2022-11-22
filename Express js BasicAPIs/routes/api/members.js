const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');


router.get('/:id',(req,res)=>{
    const found = members.some(member=>member.id === parseInt(req.params.id));
    if(found)
    res.json(members.filter(member => member.id===parseInt(req.params.id)));
    else
    res.status(400).json({msg:`No member found with this ${req.params.id} id`});
})

router.get('/',(req,res)=> res.json(members));


router.post('/',(req,res)=>{
    const newMember = {
        id : uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'
    }
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:'Please include an email and name'})
    }
    members.push(newMember);
    res.json(members);
    
})


router.put('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name;
                member.email = updMember.email;
                res.json({msg:'Member updated',member})
            }
        })
    }
    else{
        res.status(400).json({msg:`No member found with id of ${req.params.id}`});
    }
})


router.delete('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
        res.json({msg:'Member Deleted',members:members.filter(member => member.id !== parseInt(req.params.id))})
    }
    else{
        res.status(400).json({msg:`No member found with id of ${req.params.id}`});
    }
})

module.exports = router;