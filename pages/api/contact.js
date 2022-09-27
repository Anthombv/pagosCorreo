// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  let multer = require("multer");
  let nodemailer = require("nodemailer");

  var path;

  var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./images");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "_" + Date.now() + "_" + file.originalname
      );
    },
  });

  var upload = multer({
    storage: Storage,
  }).single("image");

  upload(req, res, function (err) {
    if (err) {
      return res.end("Something went wrong");
    } else {
      
      const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.titan.email",
        auth: {
          user: "mbarcia@grupoancon.com",
          pass: "Mb2022./anc",
        },
        secure: true,
      });
      const mailData = {
        from: "mbarcia@grupoancon.com",
        to: "mbarcia@grupoancon.com",
        subject: `${req.body.subject}`,
        html: `
      <div><strong>Name:</strong> ${req.body.fullName}</div>
      <br/>
      <div><strong>Email:</strong> ${req.body.email}</div>
      <br/>
      <div><strong>Phone:</strong> ${req.body.phone}</div>
      <br/>
      <div><strong>Proyecto:</strong> ${req.body.project}</div>
      <br/>
      <div><strong>Numero de Lote:</strong> ${req.body.lot}</div>
      <br/>
      <div><strong>Fecha que corresponde su pago:</strong> ${req.body.date}</div>
      <br/>`,
        attachments: [
          {
            path: path
          },
        ],
      };
      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
      res.status(200).json({ status: "OK" });
    }
  });
}
