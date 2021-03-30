const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50,
    },
    email : {
        type : String,
        trim : true, // jhon an@naver.com // 스페이스를 없애주는 역할
        unique : 1,
    },
    password : {
        type : String,
        maxlength : 100
    },
    lastname : {
        type : String,
        maxlength : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
})

userSchema.pre('save',function(next){    
    var user = this; // User.js

    if(user.isModified('password')){
        
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
    
            // plain password를
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err);
    
                // 암호화된 hash 비밀번호로 교체
                user.password = hash;
                next()
            })
        });    
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword,cb){
 // plainPassword 1234    암호화된 비밀번호 $2b$10$fdhiW/wQMY.JHItBzAiGROcuoZsd5FmwhhGlkVJKuorHkgUmll7IG 가 같은지 확인

 bcrypt.compare(plainPassword , this.password,function(err,isMatch){
     if(err) return cb(err);
     cb(null,isMatch);
 })
};


userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용해서 token을 생성하기

    var user = this;
    var token = jwt.sign(user._id.toHexString(),'secretToken');

    // user._id + 'secretToken' = token

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.staticss.findByToken = function(token,cb){
    var user = this;

    // user._id + '' = token;
    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken',function(err,decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 토큰과 DB 에 보관된 토큰이 일치하는지 확인
            user.findOne({"_id" : decoded,"token" : token},function(err,user){
                if(err) return cb(err);
                cb(null,user)

            })
    })
}

const User  = mongoose.model('User',userSchema);

module.exports = {User}