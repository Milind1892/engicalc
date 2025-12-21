import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendUserSubscriptionEmail({
  to,
  name,
  plan,
  start,
  end,
}: any) {
  await transporter.sendMail({
    from: `"EngiCalc" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your EngiCalc Subscription is Active 🎉",
    html: `
      <h2>Subscription Activated</h2>
      <p>Hi <b>${name}</b>,</p>
      <p>Your <b>${plan}</b> subscription is now active.</p>
      <p>
        <b>Valid from:</b> ${start}<br/>
        <b>Valid till:</b> ${end}
      </p>
      <p>Thank you for choosing <b>EngiCalc</b>.</p>
    `,
  });
}

export async function sendAdminSubscriptionEmail(data: any) {
  await transporter.sendMail({
    from: `"EngiCalc System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New Subscription Purchased 🚀",
    html: `
      <h2>New Subscription</h2>
      <ul>
        <li><b>Name:</b> ${data.name}</li>
        <li><b>Email:</b> ${data.email}</li>
        <li><b>Phone:</b> ${data.phone}</li>
        <li><b>Plan:</b> ${data.plan}</li>
        <li><b>Country:</b> ${data.country}</li>
        <li><b>State:</b> ${data.state}</li>
        <li><b>City:</b> ${data.city}</li>
        <li><b>Subscription ID:</b> ${data.subscriptionId}</li>
      </ul>
    `,
  });
}
