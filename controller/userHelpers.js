var jsreport = require("jsreport");
var fs = require("fs");
var path = require("path");

module.exports = {
  /* here we check if the user have root access */
  isLogin : function (req,res,next) {
    // if (req.isAuthenticated()) {
    // return next();
    // }
    // res.redirect('/');
    return next();
  },
  printReport : function(HTMLprint,res){
    jsreport.render({
      template: { 
        engine: "jsrender",
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/reports/"+HTMLprint), "utf8")
      }
    }).then(function (response) {
       //you can for example pipe it to express.js response
       response.stream.pipe(res);
    });
  }
  
};
