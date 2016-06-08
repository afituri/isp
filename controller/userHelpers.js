var jsreport = require("jsreport");
var fs = require("fs");
var path = require("path");

module.exports = {
  /* here we check if the user have root access */
  isLogin : function (req,res,next) {
   /* if (req.isAuthenticated()) {
    return next();
    }
    res.redirect('/');*/
    return next();
  },
  printReport : function(HTMLprint,result,res){
    jsreport.render({
      template: { 
        engine: "jsrender",
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/reports/"+HTMLprint), "utf8"),
        
      },data:{result:result}
    }).then(function(resp) {
      resp.stream.pipe(res);
    }).catch(function(e) {
      res.end(e.message);
    });
  }, 
  printReportH : function(HTMLprint,result,res){
    jsreport.render({
      template: { 
        engine: "jsrender",
        recipe: "phantom-pdf",
        helpers:getSubTotal.toString(),
        content: fs.readFileSync(path.join(__dirname, "../views/reports/"+HTMLprint), "utf8"),
        
      },data:{result:result}
    }).then(function(resp) {
      resp.stream.pipe(res);
    }).catch(function(e) {
      res.end(e.message);
    });
  },
  
};
function getSubTotal(data) {
  var html = '';
  var orderArray=[];
  for(i in data.order){
    orderArray[data.order[i].invoice] = {name:data.order[i].product.name,end:data.order[i].endDate};
  }
  data.result.forEach(function (i) { 
    html += '<tr>'+ 
                '<td class="text-right">'+
                  i.customer.name+
               ' </td>'+
                '<td class="text-center">'+
                 i.instock.macAddress+
                '</td>'+
                '<td class="text-left">'+
                  orderArray[i._id].name+
                '</td>'+
                '<td class="text-center">'+
                  i.customer.phone+
               ' </td>'+
               ' <td class="text-center">'+
                  orderArray[i._id].end+
               ' </td> '+
              '</tr>';
  });
  data.invoice.forEach(function (i) { 
    html += '<tr>'+ 
                '<td class="text-right">'+
                  i.customer.name+
               ' </td>'+
                '<td class="text-center">'+
                 i.invoice.instock.macAddress+
                '</td>'+
                '<td class="text-left">'+
                  orderArray[i._id].name+
                '</td>'+
                '<td class="text-center">'+
                  i.customer.phone+
               ' </td>'+
               ' <td class="text-center">'+
                  orderArray[i._id].end+
               ' </td> '+
              '</tr>';
  });

  return html;
}