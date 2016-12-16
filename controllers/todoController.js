var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://vilas:vilas@ds119738.mlab.com:19738/todo');

var obj = new mongoose.Schema({
  item: String
});

var collec = mongoose.model('Todo', obj);

module.exports = function(app){

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/todo', function(req, res){
 collec.find({}, function(err, data){
  if(err) throw err;
  res.render('todo', {todos: data});
  });

});

app.post('/todo', urlencodedParser, function(req, res){
 collec(req.body).save(function(err, data){
 if(err) throw err;
 res.json(data);
 })

});

app.delete('/todo/:item', function(req, res){
 collec.find({item: req.params.item.replace(/\-/g,' ')}).remove(function(err, data){
    if(err) throw err;
    res.json(data);
   });
});

}
