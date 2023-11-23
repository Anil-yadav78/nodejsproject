const express = require('express');
const topselling =require('../module/dbtopsellingschema')
const colproduct =require('../module/dbcol-4products')
const router=express.Router();
const multer=require('multer')
const kidproduct=require('../module/kidschema');
const signup=require('../module/signupschema');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const ExcelJS = require('exceljs')





// router.get('/' ,(req , res)=>{
//     res.render('index')
// });


router.get('/index' , async(req , res) =>{
    try{
        const sellingdata = await topselling.find({});
        const newdata =     await  kidproduct.find({})
        const coldata =     await  colproduct.find({})
        res.render('index' , {sellingdata:sellingdata , newdata:newdata , coldata:coldata});
        console.log(sellingdata , newdata , coldata);
    }catch(err){
        console.log(err);
    }

});

router.get('/products' , async(req , res) =>{
    try{
        const coldata = await colproduct.find({});
        
        
        res.render('products' , {coldata: coldata});
        console.log(coldata);

    }catch(err){
        console.log(err);
    }
});




// top-selling API
router.get('/topselling', async(req,res)=>{
    try{
        const sellingdata = await topselling.find({});
        res.render('dashboard/topselling' , {sellingdata: sellingdata});
        // console.log(coldata);

    }catch(err){
        console.log(err);
    }
});


router.get('/men', async(req,res)=>{
    try{
        const sellingdata = await topselling.find({});
        res.render('men' , {sellingdata: sellingdata});
        // console.log(coldata);

    }catch(err){
        console.log(err);
    }
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');

    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var filefilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({ storage, filefilter});


router.post('/topselling', upload.single('image'), (req , res)=>{
    var addproduct = {
        productname:req.body.productname,
        productdescription:req.body.productdescription,
        price:req.body.price,
        image:req.file.filename,
        discount:req.body.discount
      
       
    };
    var productpost = new topselling(addproduct);
    productpost.save()
    .then(()=>

    res.json('product added'))
    .catch(err=> res.status(400).json('error:' + err));
})





router.get('/viewtopselling' , async(req , res) =>{
    try{    
        const sellingdata = await topselling.find({});
        res.render('dashboard/viewtopselling' , {sellingdata: sellingdata});
        console.log(sellingdata);

    }catch(err){
        console.log(err);
    }
});
// 
router.get('/edit1/:id', async(req , res) =>{
    try{    
        const editdata1 = await topselling.findById(req.params.id);
        res.render('dashboard/edit-top-selling',{editdata1: editdata1});
        console.log(editdata1);

    }catch(err){
        console.log(err);
    }
});

router.post('/edit1/:id',async (req,res)=>{
    try{
   
        var product = {
            productname:req.body.productname,
            productdescription:req.body.productdescription,
            price:req.body.price,
            image:req.body.image,
            discount:req.body.discount
          
    
        };
        const data= await  topselling.findByIdAndUpdate(req.params.id,product);
        res.redirect('../viewtopselling');
    }catch(err){
        console.log(err);
    }
});



router.get('/delete2/:id',async(req ,res)=>{
    try{
        const productdelete=await topselling.findByIdAndRemove(req.params.id);
        return res.redirect('http://localhost:7000/viewtopselling');
    
    }catch(err){
        console.log(err);
    }
});

// col-4-products
router.get('/women' , async(req , res) =>{
    try{
        const coldata = await colproduct.find({});
        res.render('women' , {coldata: coldata});
        console.log(coldata);

    }catch(err){
        console.log(err);
    }
});



router.get('/col-4products',(req,res)=>{
    res.render('dashboard/col-4products')
});


 var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload2');

    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var filefilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload2= multer({ storage, filefilter});


router.post('/col-4products', upload2.single('image'), (req , res)=>{
    var addproduct = {
        productname:req.body.productname,
        productdescription:req.body.productdescription,
        price:req.body.price,
        image:req.file.filename,
        discount:req.body.discount
      
       
    };
    var productpost = new colproduct(addproduct);
    productpost.save()
    .then(()=>

    res.json('product added'))
    .catch(err=> res.status(400).json('error:' + err));
})


router.get('/viewcol-4products' , async(req , res) =>{
    try{    
        const coldata = await colproduct.find({});
        res.render('dashboard/viewcol-4products' , {coldata: coldata});
        console.log(coldata);

    }catch(err){
        console.log(err);
    }
});
// 
router.get('/edit2/:id', async(req , res) =>{
    try{    
        const editdata2 = await colproduct.findById(req.params.id);
        res.render('dashboard/editcol-4product',{editdata2: editdata2});
        console.log(editdata2);

    }catch(err){
        console.log(err);
    }
});

router.post('/edit2/:id',async (req,res)=>{
    try{
   
        var product = {
            productname:req.body.productname,
            productdescription:req.body.productdescription,
            price:req.body.price,
            image:req.body.image,
            discount:req.body.discount
          
    
        };
        const data= await  colproduct.findByIdAndUpdate(req.params.id,product);
        res.redirect('../viewcol-4products');
    }catch(err){
        console.log(err);
    }
});



router.get('/delete3/:id',async(req ,res)=>{
    try{
        const productdelete=await colproduct.findByIdAndRemove(req.params.id);
        return res.redirect('http://localhost:7000/viewcol-4products');
    
    }catch(err){
        console.log(err);
    }
});



// kids section api


router.get('/kids' , async(req , res) =>{
    try{
        const newdata = await kidproduct.find({});
        res.render('kids' , {newdata: newdata});
        console.log(newdata);

    }catch(err){
        console.log(err);
    }
});



router.get('/kids-product',(req,res)=>{
    res.render('dashboard/kids-product')
});


 var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload2');

    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var filefilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload2= multer({ storage, filefilter});


router.post('/kids-product', upload2.single('image'), (req , res)=>{
    var addproduct = {
        productname:req.body.productname,
        productdescription:req.body.productdescription,
        price:req.body.price,
        image:req.file.filename,
        discount:req.body.discount
      
       
    };
    var productpost = new kidproduct(addproduct);
    productpost.save()
    .then(()=>

    res.json('product added'))
    .catch(err=> res.status(400).json('error:' + err));
})





router.get('/view-kids-product' , async(req , res) =>{
    try{    
        const newdata = await kidproduct.find({});
        res.render('dashboard/view-kids-product' , {newdata: newdata});
        console.log(newdata);

    }catch(err){
        console.log(err);
    }
});

router.get('/edit3/:id', async(req , res) =>{
    try{    
        const editdata3 = await kidproduct.findById(req.params.id);
        res.render('dashboard/edit-kids-product',{editdata3: editdata3});
        console.log(editdata3);

    }catch(err){
        console.log(err);
    }
});

router.post('/edit3/:id',async (req,res)=>{
    try{
   
        var product = {
            productname:req.body.productname,
            productdescription:req.body.productdescription,
            price:req.body.price,
            image:req.body.image,
            discount:req.body.discount
          
    
        };
        const data= await  kidproduct.findByIdAndUpdate(req.params.id,product);
        res.redirect('../view-kids-product');
    }catch(err){
        console.log(err);
    }
});



router.get('/delete4/:id',async(req ,res)=>{
    try{
        const productdelete=await kidproduct.findByIdAndRemove(req.params.id);
        return res.redirect('http://localhost:7000/view-kids-product');
    
    }catch(err){
        console.log(err);
    }
});



// product detalis Api

router.get('/packagedetails/:id' , async(req , res) =>{
    try{    
        const sellingdata = await topselling.findById(req.params.id);
        res.render('product-details' , {sellingdata: sellingdata});
        console.log(sellingdata);

    }catch(err){
        console.log(err);
    }
});
router.get('/packagedetailswomen/:id' , async(req , res) =>{
    try{    
        const coldata = await colproduct.findById(req.params.id);
        res.render('women-details' , {coldata: coldata});
        console.log(coldata);

    }catch(err){
        console.log(err);
    }
});
router.get('/packagedetailskids/:id' , async(req , res) =>{
    try{    
        const newdata = await kidproduct.findById(req.params.id);
        res.render('kids-details' , {newdata: newdata});
        console.log(newdata);

    }catch(err){
        console.log(err);
    }
});



// addcart api


router.get('/contact' ,(req ,res)=>{
    res.render('contact');
})


// router.post('/contactdata'(req , res)=>{
//    var contacts ={
//     name:req.body.name,
//     email:req.body.email,
//     subject:req.body.subject,
//     message:req.body.subject
//    }
//    var contactpost = new contact(contacts);
//    contactpost.save()
//    .then(()=>
//    res.json("MESSSAGE SENDED"))
//    .catch(err =>res.status(404).json("err:" + err))
// });

//  signup API

router.get('/signup' ,(req ,res)=>{
    res.render('signup');
})


router.post('/signup' ,(req ,res)=>{
    var register ={
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    };

    var regpost = new signup(register);
    regpost.save()
    .then(()=>
    res.json('register succesfully'))
    .catch(err => res.status(404).json('err:' +err))
});

router.get('/viewsignup' , async(req ,res)=>{
    try{
        const signupdata = await signup.find({});
        res.render('dashboard/viewsignup' , {signupdata:signupdata})
        console.log('signupdata')
    }catch(err){
        console.log(err);
    }
});


router.get('/edit4/:id', async(req , res) =>{
    try{    
        const editdata4 = await signup.findById(req.params.id);
        res.render('dashboard/editsignup',{editdata4: editdata4});
        console.log(editdata4);

    }catch(err){
        console.log(err);
    }
});

router.post('/edit4/:id',async (req,res)=>{
    try{
   
        var register ={
            username:req.body.username,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password
        };
    
        const data= await  signup.findByIdAndUpdate(req.params.id,register);
        res.redirect('../viewsignup');
    }catch(err){
        console.log(err);
    }
});



router.get('/delete5/:id',async(req ,res)=>{
    try{
        const productdelete=await signup.findByIdAndRemove(req.params.id);
        return res.redirect('http://localhost:7000/viewsignup');
    
    }catch(err){
        console.log(err);
    }
});

router.get('/login' ,(req ,res)=>{
    res.render('login');
})

router.post('/login', async(req,res)=>{
    var email =req.body.email,
    password=req.body.password;
     try{
        var user = await signup.findOne({email: email})
        .exec();
        if(!user){
            res.redirect('/');
        }
        user.comparePassword(password,(error,match)=>{
            if(!match){
                res.redirect("/");
            }
          })
req.session.user = user;

        res.redirect('/addcart');

     }catch(error){
        console.log(error)
     }
});

// session API

// router.get('/dashboard' , (req,res)=>{
//     if(req.session.user && req.cookies.user_id){
//     res.render('dashboard/admin')
       
//     }
//     else{
//         res.redirect('/login')
//     }
// }); 

router.get('/dashboard' , (req , res)=>{
    res.render('dashboard/admin')
})
router.get('/datatable',(req ,res)=>{
    res.render('dashboard/datatable')
})

router.get('/addcart' , (req,res)=>{
    if(req.session.user && req.cookies.user_id){
        res.clearCookie('user_id');
        res.render('addcart');
    }else{
        res.redirect('/login');
    }
});

// router.get('/addcart' , (req , res)=>{
//     res.render("addcart")
// })

router.get('/logout' , (req,res)=>{
    if(req.session.user && req.cookies.user_id){
        res.clearCookie('user_id');
        res.redirect('/login');
    }else{
        res.redirect('/login');
    }
})






// export excel


router.get('/export/excel', async (req, res) => {
    try {
      const data = await signup.find({}); 
  

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');
  
    
      worksheet.columns = [
        { header: 'UserName', key: 'username', width: 20 },
        { header: 'FirstName', key: 'firstname', width: 20 },
        { header: 'LastName', key: 'lastname', width: 20 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Password', key: 'password', width: 10 },
      ];
  
      data.forEach(item => {
        worksheet.addRow(item);
      });
  
      const filePath = 'data.xlsx';
      await workbook.xlsx.writeFile(filePath);
      res.download(filePath, 'data.xlsx', (err) => {
        fs.unlinkSync(filePath);
      });
    } catch (error) {
      console.error('Error :', error);
      res.status(500).send('Internal Server Error');
    }
  });





//   import 




// Multer configuration for file upload
const uploads= multer({ dest: 'uploads/' });


router.post('/import-user', uploads.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const workbook = new ExcelJS.Workbook();
    const filePath = req.file.path;

    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1); 

    const data = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        data.push({
          username: row.getCell(1).value,
          firstnamename: row.getCell(1).value,
          lastname: row.getCell(1).value,
          email: row.getCell(3).value,
          password: row.getCell(3).value,
        
        });
      }
    });

  
    await signup.insertMany(data);

    res.status(200).send('FILE UPLOADED');
  } catch (error) {
    console.error('Error :', error);
    res.status(500).send(' Server Error');
  }
});




// export into pdf 

// router.get('/export/pdf', async (req, res) => {
//     try {
//       const data = await signup.find({});
  
//       const doc = new PDFDocument();
//       const fileName = 'data.pdf';
//       const writeStream = fs.createWriteStream(fileName);
  
//       doc.pipe(writeStream);
  
//       doc.fontSize(20).text('Data Export', { align: 'center' }).moveDown();
  
//       data.forEach((item, index) => {
//         doc.text(`#${index + 1}`);
//         for (const key in item) {
//           if (Object.prototype.hasOwnProperty.call(item, key)) {
//             doc.text(`${key}: ${item[key]}`);
//           }
//         }
//         doc.moveDown();
//       });
  
//       doc.end(); 
  
//       writeStream.on('finish', () => {
//         res.download(fileName);
//         fs.unlinkSync(fileName);
//       });
//     } catch (error) {
//       console.error('Error exporting to PDF:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });


// export csv 

router.get('/export/csv', async (req, res) => {
    try {
      const data = await signup.find({}); 
  
      const createCsvWriter = require('csv-writer').createObjectCsvWriter;
      const csvWriter = createCsvWriter({
        path: 'data.csv',
        header: [

          { id: 'username', title: 'UserName' },
          { id: 'firstname', title: 'FirstName' },
          { id: 'lastname', title: 'LastName' },
          { id: 'email', title: 'Email' },
          { id: 'password', title: 'Password' },
        
        ],
      });
  
      
      csvWriter.writeRecords(data)
        .then(() => {
          console.log('CSV file created successfully');
          res.download('data.csv'); 
        });
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      res.status(500).send('Internal Server Error');
    }
  });
module.exports = router;












