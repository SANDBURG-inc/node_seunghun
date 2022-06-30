const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
const MongoClient = require('mongodb').MongoClient
app.set('view engine','ejs');

var db;
MongoClient.connect('mongodb+srv://yungs0917:seung8869%40@cluster0.gszmo.mongodb.net/?retryWrites=true&w=majority',function(에러,client){

    if(에러){
        return console.log(에러)
    }

    db = client.db('todoapp');
    db.collection('post').insertOne( { 이름 : 'john',나이 : '20', _id:100},function(에러,결과){
        console.log('저장완료');
    });

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
    db.collection('counter').findOne({name : '게시물갯수'}, (에러,결과) =>{
        console.log(결과.totalPost);
        var 총게시물갯수 = 결과.totalPost
        db.collection('post').insertOne({_id: 총게시물갯수 + 1 , 이메일 : 요청.body.title , 세부사항 : 요청.body.content },(에러,결과) =>{
            console.log('이메일과 세부사항 저장완료');
            db.collection('counter').updateOne({name :'게시물갯수'},{ $inc : {totalPost:1}},function(에러,결과){
                if(에러){return console.log(에러)}
            })
        } )
        
    })
    console.log(요청.body)
    
    응답.send('전송완료')
});

app.get('/list', function(요청, 응답){
    db.collection('post').find().toArray(function(에러, 결과){
      console.log(결과)
      응답.render('list.ejs', { posts : 결과 })
    })
  })

app.delete('/delete',function(요청,응답){
    console.log(요청.body)
    요청.body._id = parseInt(요청.body._id);
    db.collection('post').deleteOne(요청.body,function(에러,결과){
        console.log('삭제완료');
        응답.status(200).send({ message : '성공했습니다'});
    })
})