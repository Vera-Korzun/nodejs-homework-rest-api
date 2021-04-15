const sgMail = require('@sendgrid/mail')
const Mailgen = require('mailgen')
const dotenv = require('dotenv')
dotenv.config()

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Contacts',
    link: 'https://localhost:3000/'
  }
})

const sendVerifyMail = async (verifyToken, email) => {
  const template = {
    body: {
      name: email,
      intro: 'Welcome to Contacts! We\'re very excited to have you on board.',
      action: {
        instructions: 'To get started with Contacts, please click here:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Confirm your account',
          link: `http://localhost:3000/api/users/verify/${verifyToken}`
        }
      },
      outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
  }

  const emailBody = mailGenerator.generate(template)

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: email, // Change to your recipient
    from: 'veraminich@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    html: emailBody,
  }

  await sgMail.send(msg)
}

module.exports = { sendVerifyMail }
