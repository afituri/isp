var jsreport = require("jsreport");
var fs = require("fs");
var path = require("path");

module.exports = {
  /* here we check if the user have root access */
  isLogin : function (req,res,next) {
    if (req.isAuthenticated()) {
    return next();
    }
    res.redirect('/');
     /*return next();*/
  },
  isResller : function (req,res,next) {
    if (req.isAuthenticated()&&req.user.level<=2) {
    return next();
    }
    res.redirect('/');
     /*return next();*/
  },
 isAdmin : function (req,res,next) {
    if (req.isAuthenticated()&&req.user.level==1) {
    return next();
    }
    res.redirect('/');
     /*return next();*/
  },

  printReportPaid : function(HTMLprint,result,res){
    jsreport.render({
      template: { 
        engine: "jsrender",
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/reports/"+HTMLprint), "utf8"),
        
      },data:{
        result:result
      }
    }).then(function(resp) {
      resp.stream.pipe(res);
    }).catch(function(e) {
      res.end(e.message);
    });

  },
  printReport : function(HTMLprint,result,res){
    jsreport.render({
      template: { 
        engine: "jsrender",
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/reports/"+HTMLprint), "utf8"),
        
      },data:{result:result.result,
        active:result.active
      }
    }).then(function(resp) {
      resp.stream.pipe(res);
    }).catch(function(e) {
      res.end(e.message);
    });
  }, 
  printReportMoney : function(HTMLprint,result,res){
    jsreport.render({
      template: { 
        engine: "jsrender",
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/reports/"+HTMLprint), "utf8"),
        
      },data:{result:result.result,
        active:result.active,
        sum:result.sum,
        piad:result.piad
      }
    }).then(function(resp) {
      resp.stream.pipe(res);
    }).catch(function(e) {
      res.end(e.message);
    });
  }, 
  // printReportH : function(HTMLprint,result,res){
  //   jsreport.render({
  //     template: { 
  //       engine: "jsrender",
  //       recipe: "phantom-pdf",
  //       helpers:getSubTotal.toString(),
  //       content: fs.readFileSync(path.join(__dirname, "../views/reports/"+HTMLprint), "utf8"),
        
  //     },data:{result:result}
  //   }).then(function(resp) {
  //     resp.stream.pipe(res);
  //   }).catch(function(e) {
  //     res.end(e.message);
  //   });
  // },
  
};
