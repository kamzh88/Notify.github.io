var connection = require("./connection.js");

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
            console.log(result);
        });
    },
    insertOne: function () {

    },
    updateOne: function () {

    }
};

module.exports = orm;