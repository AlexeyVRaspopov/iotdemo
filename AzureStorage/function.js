var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var config = {
        userName: '',
        password: '',
        server: 'alexrassql1.database.windows.net',

        // If you're on Windows Azure, you will need this:
    options:
        {
                database: 'iotalexras',
                  encrypt: true
        }
};

    var connection = new Connection(config);

    connection.on('connect', function(err) {

        if (err) {
            context.log(err);

            context.res = {
                status: 500,
                body: "Unable to establish a connection."
            };
            context.done();

        } else {
            executeStatement();
        }
    });

    function executeStatement() {

        request = new Request("select long as lat, lat as lng from locations for json path", function(err, rowCount) {
            if (err) {
                context.log(err);

                context.res = {
                    status: 500,
                    body: "Failed to connect to execute statement."
                };
                context.done();

            } else {
                context.log(rowCount + ' rows');
            }
        });

        request.on('row', function(columns) {
            columns.forEach(function(column) {
                context.log(column.value);
                context.res = {
                    status: 200,
                    body: column.value
                };
            });

            context.done();
        });

        connection.execSql(request);
    }
};