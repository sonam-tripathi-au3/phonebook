var directory= require('../controllers/controller')
module.exports = (app) => {
    app.get('/all', directory.all)
    app.get('/page/:pageNo', directory.pagination)
    app.post('/register', directory.register)
    
}