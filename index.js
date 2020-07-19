const express = require ('express' );
const mongoose = require('mongoose');
const { response } = require('express');
const app = express();







const PORT = process.env.PORT || 8080;

console.log(PORT);


//let mongodb = process.env.MONGODB_UI ;
MONGODB_UI = 'mongodb+srv://rimel:rimelBM@cluster0-svva1.mongodb.net/first?retryWrites=true&w=majority';

mongoose.connect(MONGODB_UI ||'mongodb://localhost/server',{
        useNewUrlParser:true,
        useUnifiedTopology:true
       }     
  ).then(()=>{console.log('conected ')})
  .catch(()=>console.log('not connected'))

  

//Schema
let PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    favoriteFoods
        :[{type:String}]
    
}) ; 

//model
let Person = mongoose.model('Person',PersonSchema) ;

let newperson = new Person({
    name :'sana' ,
    age: 20 ,
    favoriteFoods:['pizza','cake']
    
});


newperson.save((error)=>{
    if(error){
        console.log('something happend !!!') ;
    } else {
        console.log('data has been saved') ;
    }
}) ; 


Person.create ([
    {
    name :'ahlem' ,
    age: 23 ,
    favoriteFoods:['glace','cake','Coca']
    }
    ,
    {
    name :'wessa' ,
    age: 25 ,
    favoriteFoods:['pasta','gateau','juce']
    },
    {
    name :'ahmed' ,
    age: 25 ,
    favoriteFoods:['pasta','gateau','juce']
    },
    {
    name :'rimel' ,
    age: 25 ,
    favoriteFoods:['pasta','gateau','juce']
    },
    {
    name :'moncef' ,
    age: 25 ,
    favoriteFoods:['pasta','gateau','juce']
    },
    {
    name :'fadhila' ,
    age: 25 ,
    favoriteFoods:['pasta','gateau','juce']
    }
    ]
    
          ,(error)=>{
        if(error){
            console.log('something happend !!!') ;
        } else {
            console.log('data has been saved') ;
        }}
    );

Person.find({name:'moncef' //search query
}) 
.then(person=>{console.log(person)})
.catch(err=>{console.log(err)}) ;

Person.findOne({favoriteFoods : 'glace' })
.then(food=>{console.log(food)})
.catch(err=>{console.log(err)}) 



const foodToAdd  = "hamburgeur" ; 

Person.findById('5f1361a30519370ad8d6b146'
        , function(err, data){
    
        data.favoriteFoods.push(foodToAdd);
        console.log(data);
        data.save(function(err, data){
            if(err){console.log(err)}
            else{
          console.log(data)}
        });  
        
      });


Person.findOneAndUpdate(
    {name : 'sana'},
    {age: 20 },
    {new:true,
    runValidators:true}
).then(doc=>{console.log(doc)})
.catch(err=>{console.error(err)})

Person.findByIdAndRemove( {_id : '5f1366196600ad2f14bd7a98'} 
).then(response=>{console.log(response)})
.catch(err=>{console.log('err')})


let nameToRemove = "Ahlem" ;
Person.remove({name:nameToRemove},(err,data)=>{
    if(err){console.log(err)}
    else{console.log(data.toJSON5)}
})

let foodToSearch = "burrito";
Person.find({favoriteFoods : foodToSearch}).sort({name:1}).limit(10).select({age:0})
.exec((err,data)=>{console.log("your data is "+data)})



app.listen(PORT , console.log('server is starting at' +PORT)) ;