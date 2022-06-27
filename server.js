const express = require('express');
const app = express();

app.listen(8080,function(){
    console.log('listenening on 8080');
});

app.get('/pet',function(요청,응답){
    응답.send('펫용품쑈핑할수있는 페이지입니다.');
});

app.get('/',function(요청,응답){
    응답.sendFile(__dirname + '/index.html');
});

