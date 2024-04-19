const express = require('express')
const connectDB = require("./db")
const multer = require('multer')
const User = require("./models")
// const fs = require('fs').promises;


const uploadToCloudinary = require("./cloudinaryImgUpload")

const app = express()
app.use(express.json())
app.use('/media', express.static('media'))


// ### cloudinary image upload
const storage = multer.diskStorage({});
const upload = multer({
  storage
})
const uploadImageMiddleware = async (req, res, next) => {
    console.log("inside middleware")
    if (req.file) {
        const imagePath = req.file.path
        const result = await uploadToCloudinary(imagePath)
        console.log("uploadToCloudinary result: ", result)
        req.body.image = result.url
        console.log("inside if")
    }
    next()
}


app.get("/", async (req, res) => {
    try {
        const users = await User.find({})
        console.log(users)
        return res.json(users)
    } catch (error) {
        console.error(error.message)
    }
})

app.post("/", upload.single("image"), uploadImageMiddleware, async (req, res) => {
    const newUser = new User({
        ...req.body,
    })

    const savedUser = await newUser.save();

    return res.json({
        message: "success",
        data: savedUser
    })

    // console.log(req)
    // return {messsage: "yes"}
})

const PORT = 3000

connectDB()
app.listen(PORT, () => console.log(`listening on port ${PORT}`))


// ### local image upload

// const storage = multer.diskStorage({
//     destination:"./media/images",
//     filename: (req, file, cb) => {
//         const filename = `${Date.now()}${file.originalname}`
//         return cb(null, filename)
//     }
// })

// const upload = multer({
//     storage: storage
// })

// app.get("/", async (req, res) => {
//     try {
//         const users = await User.find({})
//         console.log(users)
//         return res.json(users)
//     } catch (error) {
//         console.error(error.message)
//     }
// })

// app.post("/", upload.single("image"), async (req, res) => {
//     const newUser = new User({
//         ...req.body,
//         image: req.file.destination + "/" + req.file.filename
//     })

//     const savedUser = await newUser.save();

//     return res.json({
//         message: "success",
//         data: savedUser
//     })
// })


// const deleteUserMiddleware = async (req, res, next) => {
//     const userId = req.params.id;
 
//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     req.filePath = user.image
//     // this is not deleting the user WTF!
//     await User.deleteOne({id: user.id})
//     next();
// }

// const deleteUserImageMiddleware = async (req, res, next) => {
//     if (req.filePath) {
//         await fs.unlink(req.filePath);
//     }
//     next()
// }
 
// app.delete("/:id", deleteUserMiddleware, deleteUserImageMiddleware, async (req, res) => {
//     try {
//         return res.json({message: "user deleted"})
//     } catch (error) {
//         console.error(error.message)
//     }
// })

