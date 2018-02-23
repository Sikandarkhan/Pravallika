var AWS = require("aws-sdk");
AWS.config.update({
    accessKeyId: "AKIAJKTBSLSFTHZPWDXQ",
    secretAccessKey: "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",
    region: "ap-south-1"
    // endpoint: "http://127.0.0.1:9199"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Movies";
var year = 2018;
var title = "#PSPK25";
var params = {
    TableName: table,
    Key: {
        "year": year,
        "title": title
    },
    ConditionExpression: "info.rating = :val",
    ExpressionAttributeValues: {
        ":val": 6.5
    }
};
console.log("Attempting a conditional delete...");
docClient.delete(params, function (err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null,
            2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});