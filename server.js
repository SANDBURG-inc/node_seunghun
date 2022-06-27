const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))

const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://yungs0917:seung8869@@cluster0.gszmo.mongodb.net/?retryWrites=true&w=majority',function(에러,client){
    app.listen(8080,function(){
        console.log('listenening on 8080');
    });
})


app.get('/pet',function(요청,응답){
    응답.send('펫용품쑈핑할수있는 페이지입니다.');
});

app.get('/',function(요청,응답){
    응답.sendFile(__dirname + '/index.html');
});

app.get('/write',function(요청,응답){
    응답.sendFile(__dirname + '/write.html');
});

app.post('/add',function(요청,응답){
    console.log(요청.body)
    응답.send('전송완료')
});