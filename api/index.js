const express = require('express');
const  app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const User = require('./models/User');
const Place = require('./models/Place');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const ImageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs')

app.listen(4000);
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
mongoose.connect(process.env.MONGO_URL);
//C0CwY4oB4JULUJej

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'heheeeeApashavocking'

//console.log({__dirname})

app.get('/test', (req,res)=> {
    res.json('test ok')
})

app.post('/register',async (req,res)=> {
    const {name,email,password} =  req.body;

    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        })
    res.json(userDoc)
    }catch(e){
        res.status(422).json(e);
    }
})

app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOK = bcrypt.compareSync(password,userDoc.password)
        if(passOK){
            jwt.sign({
                email:userDoc.email,
                _id:userDoc._id,
                 name:userDoc.name},jwtSecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(userDoc);
            })
            
        }else{
            res.status(422).json('pass not ok')
        }
       
    }else{
        res.json('not found');
    }
})

app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if (err) throw err;
            const userDoc = await User.findById(userData._id)
            res.json(userDoc)
        })
    }else{
        res.json(null)
    }
    
})

app.post('/logout', (req,res)=>{
    res.cookie('token','').json(true)
})

app.post('/uploaded-by-link',async (req,res)=>{
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const destination = __dirname+'/uploads/'+newName;
    await ImageDownloader.image({
        url: link,
        dest: destination
    })
    res.json(newName)
})

const photoMiddleware = multer({dest:'uploads'});
app.post('/upload',photoMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
    for (let i=0;i<req.files.length;i++){
        const {path,originalname} = req.files[i];
        //original name ไฟล์ที่เราอัพโหลด ชื่อว่า Sakura-Gentle-Monster-6.webp 
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1] //แยกextention นามสกุลไฟล์ 
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
})

app.post('/places', (req,res)=>{
    const {token} = req.cookies;
    const {title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests} = req.body;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if (err) throw err;
        const placeDoc = await Place.create({
            owner:userData.id,
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests
        })
        res.json(placeDoc);
    });
    
})

app.get('/places', (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData) => {
        const {id} = userData;
        res.json(await Place.find({owner:id}));
    })
})

app.get('/places/:id',async (req,res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));
})

app.put('/places',async (req,res)=>{
    const {token} = req.cookies;
    const {
        id,
        title,
        address,
        photos,
        photoLink,
        description,
        extraInfo,
        perks,
        checkIn,
        checkOut,
        maxGuests,
    } = req.body;
    jwt.verify(token,jwtSecret,{},async (err,userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner){
            placeDoc.set({
                title,
                address,
                photos,
                photoLink,
                description,
                extraInfo,
                perks,
                checkIn,
                checkOut,
                maxGuests,
            });
            placeDoc.save();
            res.json(placeDoc);
        }
    })
})