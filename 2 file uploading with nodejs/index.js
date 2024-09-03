import express from 'express'
import mongoose from 'mongoose';
import path from 'path'
import multer from 'multer';

// upload file on cloud
import { v2 as cloudinary } from 'cloudinary';
import { stringify } from 'querystring';
cloudinary.config({ 
    cloud_name: 'dxlhk1cs3', 
    api_key: '741422394262426', 
    api_secret: "XdHhnbxJWTUbOGpLdXHNEqSqDRs"
});

const app = express();

app.use(express.static(path.join(path.resolve(),'public')))
app.use(express.urlencoded({extended:true}))

// Database connection
mongoose.connect("mongodb+srv://akv8272:yporfkBreOt2PHtx@nodeexpressyoutube.6jd4j.mongodb.net/", {
    dbName: "NodeExpressMongoDbYouTube"
}).then(() => console.log("MongoDB is connected...!"))
    .catch((err) => console.error("MongoDB connection failed:", err));

    // function to upload fule in local storaget
    const storage = multer.diskStorage({
        // destination: './public/uploads', // use to upload file in local storage
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname))
        }
      })
      
      const upload = multer({ storage: storage })

   const fileshema = new mongoose.Schema({
    filname:String,
    public_id:String,
    imgUrl:String
   })

   const uploadmongo = new mongoose.model("cloudinary",fileshema)

const port = 3000;

app.get('/',(req,res)=>{
    res.render('index.ejs',{url:null});
})

app.post('/upload',upload.single("file"), async function(req,res){
   const file = req.file.path
   const cloudinaryresponse = await cloudinary.uploader.upload(file,{folder:'nodejs api series'})

   const svemongo = await uploadmongo   .create({
    filename: file.originalname,
    public_id: cloudinaryresponse.public_id,
    imgUrl: cloudinaryresponse.secure_url
   })

   res.render('index.ejs',{url:cloudinaryresponse.secure_url})
   console.log("cloudanry resposne",cloudinaryresponse);
});     

app.listen(port,()=>
    console.log(`sever is running on port ${port}`)
);