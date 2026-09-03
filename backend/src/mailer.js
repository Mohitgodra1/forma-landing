export async function sendNotificationEmail(data) {
  const name = data?.name || data?.fullName || "Visitor";
  const email = data?.email || "";
  const message = data?.message || "";
  const services = Array.isArray(data?.services) 
    ? data.services.join(', ') 
    : (data?.services || 'None');

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: { 
        name: "Finora Managements", 
        email: process.env.FROM_EMAIL || process.env.OWNER_EMAIL 
      },
      to: [{ email: process.env.OWNER_EMAIL }],
      replyTo: email ? { email: email, name: name } : undefined,
      subject: `New Contact Form Submission from ${name}`,
      htmlContent: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Services:</strong> ${services}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Brevo API error:", errorText);
    throw new Error("Failed to send email");
  }

  return await response.json();
}

export const sendContactEmail = sendNotificationEmail;