var AWS = require("aws-sdk");
AWS.config.update({
    accessKeyId: "AKIAJKTBSLSFTHZPWDXQ",
    secretAccessKey: "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",
    region: "ap-south-1"
    // endpoint: "http://127.0.0.1:9199"

});

/*year – The partition key. The attribute type is number.
• title – The sort key. The attribute type is string. */
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Movies",
    ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "#yr between :start_yr and :end_yr",
    ExpressionAttributeNames: {
        "#yr": "year",
    },
    ExpressionAttributeValues: {
        ":start_yr": 2017,
        ":end_yr": 2018
    }
};
console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err,
            null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function (movie) {
            console.log(
                movie.year + ": ",
                movie.title, "- rating:", movie.info.rating);
        });
        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}