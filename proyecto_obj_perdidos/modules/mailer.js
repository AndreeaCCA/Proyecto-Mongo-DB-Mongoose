const nodemailer = require("nodemailer");
const fs = require('fs')

const mailer={}

mailer.send = async function send(destinatario) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'andreeaccandreea@gmail.com', // generated ethereal user
      pass: 'cyllujrpkbmbccja', // generated ethereal password
    },
  })

  // send mail with defined transport object
  //mailer.getTemplate(template)
  //  .then(datos=>
      let info = await transporter.sendMail({
            from:  '"Objetos perdidos" <madrid.barajas@aeropuerto.com>', // sender address
            to: destinatario, // list of receivers
            subject: "Registro usuario nuevo", // Subject line
            text: "Estos son sus datos", // plain text body
            html: "<h1>Hello</h1>"
          })
  //  )
  console.log(info)
}

module.exports=mailer
