const config = require('../config/database');
const AWS =require('aws-sdk');
AWS.config.update(config);

const docClient = new AWS.DynamoDB.DocumentClient();

let getAnimes = () => {
    return new Promise(resolve => {
        const params = {
            TableName: 'animes'
        }
        docClient.scan(params, (err, data) => {
            if(err){
                console.log('Error: ', err);
            }else{
                resolve(data.Items);
            }
        });

    });
} 

let getAnimeById = (id) => {
    return new Promise(resolve => {
        const params = {
            TableName: 'animes',
            KeyConditionExpression: "id = :dd",
            ExpressionAttributeValues: {
                ":dd": id
            }
        }
        docClient.query(params, (err, data) => {
            if(err){
                console.log('Error: ', err);
            }else{
                resolve(data.Items);
            }
        });

    });
}

let createAnime = (data) => {
    return new Promise(resolve => {
        const params = {
            TableName: 'animes',
            Item: data
        }
        
        //console.log(params);
        docClient.put(params, (err, data) => {
            if(err){
                console.log('Error: ', err);
            }else{
                resolve(true);
            }
        });
    });
}

module.exports = {
    getAnimes,
    getAnimeById,
    createAnime
}