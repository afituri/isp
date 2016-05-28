var express = require('express');
var router = express.Router();
var instockMgr = require("../controller/inStock");

/* GET all in stock */
router.get('/search/:id', function(req, res) {
  instockMgr.searchInStockInvoice(req.params.id,function(InStock){
    res.send(InStock);
  });
});
router.get('/:limit/:page', function(req, res) {
  instockMgr.getInStock(req.params.limit,req.params.page,function(InStock){
    res.send(InStock);
  });
});
router.get('/all', function(req, res) {
  instockMgr.getAllInStock(function(InStock){
    res.send(InStock);
  });
});
/* Add new in stock  */
router.post('/add', function(req, res) {
  console.log(req.body);
  instockMgr.addInStock(req.body,function(InStock){
    res.send(InStock);
  });
});

/* Edit in stock by id  */
router.put('/edit/:id', function(req, res) {
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
