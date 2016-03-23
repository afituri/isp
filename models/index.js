var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

mongoose.connect('mongodb://localhost/app');

var model = {}

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function(file) {
        model = _.extend(model, require(path.join(__dirname, file)));                      
    });

module.exports = model;