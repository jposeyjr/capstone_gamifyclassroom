const nodemailer = require('nodemailer');
const serviceEmail = process.env.GMAIL_USER_NAME;
const servicePassword = process.env.GMAIL_USER_PASSWORD;
const url = 'http://localhost:3000/#/studentregister';

const smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: serviceEmail,
    pass: servicePassword,
  },
  tls: {
    rejectUnauthenticated: false,
  },
});

smtpTransport.verify((error, success) => {
  if (error) console.log(error, 'email');
  console.log('Working!');
});

const getOptions = (teacher, student, courseID) => {
  const mailOptions = {
    from: teacher,
    to: student,
    subject: 'You are invited to join ' + teacher.first_name + "'s classroom!",
    html: `<h1>${teacher.first_name} has invited you to join their classroom!</h1>
        <p>Please follow the link below to register.</p>
        <a href=${url}?school=${teacher.school}&course=${courseID}&email=${student}>Register here</a>
        `,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log('failed to send email @ sendmail step: ', error);
    } else {
      console.log('Sent email to student successfully!');
    }
    smtpTransport.close();
  });
};

module.exports = getOptions;
