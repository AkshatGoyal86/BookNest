var nodemailer=require('nodemailer');
var transport=nodemailer.createTransport({
    host:'smtp.gmail.com', //simple mail transfer protocal
    port:587,
    secure:false,
    requireTLS:true, // tls is a way to provide secure connection between a client and server
    auth:
    {
        user:'akshatgoyal087@gmail.com',
        pass:'vozc ocux vjox xglq'
    }
});

var mailOptions = {
    from:'akshatgoyal087@gmail.com',
    to:'contact.akshatgoyal@gmail.com',
    subject:'node mail',
    text:'hello node nodemailer'
}

transport.sendMail(mailOptions,function(error,info)
{
    if (error) {
        console.warn(error);
    }
    else {
        console.warn('email has been send',info.response);
    }
});