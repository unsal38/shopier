const nodemailer = require("nodemailer");
const { AUTH_USER, AUTH_PASS, NODEMAILER_SERVICE } = require("../config")
// const jwt_lib = require("../lib/jwt");
const ejs = require("ejs")
const path = require("path")

let transporter = nodemailer.createTransport({
    service: NODEMAILER_SERVICE,
    auth: {
        user: AUTH_USER,
        pass: AUTH_PASS
    }
});

async function transporter_verify() {
    return transporter.verify(function (error, success) {

        if (error) throw error;
        if (success === true) console.log('Bağlantı başarıyla sağlandı');

    });
}

async function send_mail(from, to, subject, text, html, attachments) {
    const info = await transporter.sendMail({
        from, // gönderici adı soyadı
        to,// "bar@example.com, baz@example.com", // gönderilecek mail
        subject, // Subject line
        text, // plain text body
        html, // html body,
        attachments
    });
    console.log("Message sent: %s", info.messageId);
    return info.messageId
}

async function nodmail(first_name, access_token, baseUrl,) {
    const url = `${baseUrl}/login/token/${access_token}`
    ejs.renderFile(path.join(__dirname, "../") + `views/passemail.ejs`, { url }, async (err, data) => {
        if (err) console.log(err, "err nodemailer js")
        if (data) {
            const to = "yesno_38@hotmail.com"
            const from = "Tarzı Şahane"
            const subject = `Merhaba ✔ ${first_name}` // Subject line
            const text = "Tarzı Şahane" // plain text body
            const html = data // || `şifre değişimi için tıklayınız <a href=${baseUrl}/login/updatepass/${token}"></a>` // html body
            const attachments = [
                {
                    filename: 'images/logo.png',
                    path: path.join(__dirname, "../") + `/images/logo.png`,
                    cid: 'images/logo.png' //same cid value as in the html img src
                },
                {
                    filename: 'images/___passwordreset.gif',
                    path: path.join(__dirname, "../") + `images/___passwordreset.gif`,
                    cid: 'images/___passwordreset.gif' //same cid value as in the html img src
                },
                {
                    filename: 'images/facebook2x.png',
                    path: path.join(__dirname, "../") + `/images/facebook2x.png`,
                    cid: 'images/facebook2x.png' //same cid value as in the html img src
                },
                {
                    filename: 'images/instagram2x.png',
                    path: path.join(__dirname, "../") + `/images/instagram2x.png`,
                    cid: 'images/instagram2x.png' //same cid value as in the html img src
                },
            ]
            transporter_verify()
            send_mail(from, to, subject, text, html, attachments)
        }
    })
}
module.exports = {
    nodmail
}


