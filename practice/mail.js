var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure:false,
  requireTLS:true,
  auth:
   {
    user: 'anjali892002@gmail.com',
    pass: 'wjsp jmaf jyol jqrh'
  }
});

var mailOptions = {
  from: 'anjali892002@gmail.com',
  to: 'anjali892002@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error)
     {
    console.warn(error);
  } 
  else 
  {
    console.warn('Email sent', info.response);
  }
})