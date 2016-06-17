var express = require('express');
var router = express.Router();
var instockMgr = require("../controller/inStock");
var userHelpers = require("../controller/userHelpers");


/* GET all in stock */
router.get('/search/:id', userHelpers.isLogin ,function(req, res) {
  instockMgr.searchInStockInvoice(req.params.id,function(InStock){
    res.send(InStock);
  });
});
//getByWP 
router.get('/getByWP/:idStock/:idItem', userHelpers.isLogin ,function(req, res) {
  instockMgr.getByWP(req.params.idStock,req.params.idItem,function(result){
    res.send(result);
  });
});


router.get('/take/:limit/:page',userHelpers.isLogin , function(req, res) {
  instockMgr.getInStockTake(req.params.limit,req.params.page,function(InStock){
    res.send(InStock);
    
  });
});


router.get('/:limit/:page', userHelpers.isLogin ,function(req, res) {
  instockMgr.getInStock(req.params.limit,req.params.page,function(InStock){
    res.send(InStock);
  });
});



router.get('/all',userHelpers.isLogin , function(req, res) {
  instockMgr.getAllInStock(function(InStock){
    res.send(InStock);
  });
});


router.get('/allTake',userHelpers.isLogin , function(req, res) {
  instockMgr.getAllInStockTake(function(InStock){
    res.send(InStock);
  });
});
/* Add new in stock  */
router.post('/add', userHelpers.isLogin ,function(req, res) {
  instockMgr.addInStock(req.body,function(InStock){
    res.send(InStock);
  });
});

/* Edit in stock by id  */
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  instockMgr.updateInStock(req.params.id,req.body,function(InStock){
    res.send(InStock);
  });
});

/* Delete in stock by id  */
router.delete('/delete/:id', function(req, res) {
  instockMgr.deleteInStock(req.params.id,function(InStock){
    res.send({result:InStock});
  });
});

/* GET in stock by ID  */
router.get('/:id', function(req, res) {
  instockMgr.getInStockId(req.params.id,function(InStock){
    res.send(InStock);
  });
});



module.exports = router;
