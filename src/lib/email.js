//Mailgun and form-data
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.DB_MAILGUN_KEY,
  url: "https://api.mailgun.net" // You can adjust the URL based on your region if necessary
});

const sendEmail = async (data) => {
  try {
    await mg.messages.create(process.env.DB_MAILGUN_DOMAIN, data);
  } catch (error) {
    console.error(error);
    throw error; // or handle it as per your application's error handling logic
  }
};

export const ContactSubmission = ({ name, email, phone, message }) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      from: "Portfolio <auto_message@mail.natewessels.dev>",
      to: `nwessels16@gmail.com`,
      subject: `Portfolio Contact Submission`,
      template: "contact_form_submission",
      "h:X-Mailgun-Variables": JSON.stringify({
        title: "Contact Request",
        body: `<p>Contact Form Submission</p><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`
      })
    };

    await sendEmail(data);
    return resolve();
  });
};

export const PortfolioViewNotification = ({ shortId, companyName, jobApplicationId, viewCount, lastViewedAt, totalViews, viewDetails }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const jobIdText = jobApplicationId ? ` (Job ID: ${jobApplicationId})` : '';

      const data = {
        from: "Portfolio Tracker <auto_message@mail.natewessels.dev>",
        to: `nwessels16@gmail.com`,
        subject: `Portfolio Viewed - ${companyName}${jobIdText}`,
        template: "contact_form_submission",
        "h:X-Mailgun-Variables": JSON.stringify({
          title: "Portfolio View Notification",
          body: `<p><strong>Portfolio View Notification</strong></p>
                 <p><strong>Company:</strong> ${companyName}</p>
                 <p><strong>Job Application ID:</strong> ${jobApplicationId || 'N/A'}</p>
                 <p><strong>View Count:</strong> ${viewCount}</p>
                 <p><strong>Total Views:</strong> ${totalViews}</p>
                 <p><strong>Last Viewed:</strong> ${lastViewedAt ? new Date(lastViewedAt).toLocaleString() : 'N/A'}</p>
                 ${viewDetails ? `<p><strong>View Details:</strong></p><pre>${JSON.stringify(viewDetails, null, 2)}</pre>` : '<p>No additional view details available</p>'}`
        })
      };

      await sendEmail(data);
      console.log(`Portfolio view notification sent for ${companyName}`);
      return resolve();
    } catch (error) {
      console.error('Error sending portfolio view notification:', error);
      return reject(error);
    }
  });
};
