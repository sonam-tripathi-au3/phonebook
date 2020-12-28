const Directory = require('../models/model');

module.exports.all = async(req, res) => {
    Directory.find().limit(10)
    .exec()
    .then(data => {
        if(!data){
            res.send('data not found')
        }
        else{
            res.json(data)
        }
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

module.exports.pagination = (req, res) => {
    const pageNo = req.params.pageNo;

    Directory.find({})
      .limit(10)
      .skip(pageNo * 10)
      .exec()
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.send(err)
      }) 
}

module.exports.register = async(req, res) => {
    const body = req.body;
    console.log(body)
    const userData = new Directory(body);
            console.log("e", userData);
            const savedUser = await userData.save();
            console.log("savedUser", savedUser);
            res.send({
                savedUser,
                code: 200,
                msg: "Data saved successfully",
              });
}