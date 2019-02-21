const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
//const SENDGRID_API_KEY = firebaseConfig.sendgrid.key


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

function parseBody(body) {
//  var helper = sgMail;
//  var fromEmail = new helper.Email(body.from);
//  var toEmail = new helper.Email(body.to);
//  var subject = body.subject;
//  var content = new helper.Content('text/html', body.content);
//  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
    var msg = {};
    msg.to = body.to;
    msg.from = body.from;
    msg.subject = body.subject;
    msg.text = body.content;
  return  msg;
}


exports.httpEmail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
  return Promise.resolve()
    .then(() => {
      if (req.method !== 'POST') {
        const error = new Error('Only POST requests are accepted');
        error.code = 405;
        throw error;
      }


//      const request = client.emptyRequest({
//        method: 'POST',
//        path: '/v3/mail/send',
//        body: parseBody(req.body)
//      });

      const msg = {
  to: 'gandharpatwardhan@s2pedutech.com',
  from: 'gandharpatwardhan@s2pedutech.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
      console.log(parseBody(req.body));
      return sgMail.send(parseBody(req.body))


    })
    .then((response) => {
      if (response.body) {
        res.send(response.body);
      } else {
        res.end();
      }
    })

    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });

    });
})