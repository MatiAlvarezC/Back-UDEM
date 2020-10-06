const status = (req,res)=>{
    return res.status(200).send({message: 'Connected'})
}

module.exports = {
    status
}
