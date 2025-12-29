import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendAdminNotification(type: 'CONTACT' | 'FARM_VISIT', data: any) {
    try {
        const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL;
        const subject = `New Exotica Farms ${type === 'FARM_VISIT' ? 'Farm Visit Request' : 'Enquiry'} - ${data.name}`;

        let htmlContent = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #2e7d32;">New ${type.replace('_', ' ')} Submission</h2>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
                <p><strong>Message:</strong></p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
                    ${data.message}
                </div>
        `;

        if (type === 'FARM_VISIT' && data.metadata) {
            const meta = JSON.parse(data.metadata);
            htmlContent += `
                <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 5px;">
                    <h3 style="margin-top: 0; color: #1565c0;">Visit Details</h3>
                    <p><strong>Preferred Date:</strong> ${meta.date}</p>
                    <p><strong>Preferred Time:</strong> ${meta.time}</p>
                    <p><strong>Visitors:</strong> ${meta.visitors}</p>
                    <p><strong>Purpose:</strong> ${meta.purpose}</p>
                </div>
            `;
        }

        htmlContent += `
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999;">This is an automated notification.</p>
            </div>
        `;

        await transporter.sendMail({
            from: `"Exotica Farms" <${process.env.SMTP_USER}>`,
            to: adminEmail,
            subject,
            html: htmlContent,
        });
    } catch (e) {
        console.error("CRITICAL: Failed to send ADMIN notification email. Check SMTP settings in .env", e);
    }
}

export async function sendUserVisitUpdate(type: 'RECEIVED' | 'APPROVED' | 'REJECTED', data: any, reason?: string) {
    let subject = "";
    let title = "";
    let message = "";
    let color = "#2e7d32";

    const meta = data.metadata ? JSON.parse(data.metadata) : {};

    if (type === 'RECEIVED') {
        subject = "Farm Visit Request Received - Exotica Farms";
        title = "Request Received Successfully!";
        message = "We have received your request to visit Exotica Farms. Our team is reviewing it, and we will get back to you shortly with an approval on this email and WhatsApp.";
    } else if (type === 'APPROVED') {
        subject = "Farm Visit Request Approved! - Exotica Farms";
        title = "Your Request is Approved!";
        message = `Good news! Your visit to Exotica Farms on ${meta.date} has been approved. We are looking forward to hosting you.`;
        color = "#1565c0";
    } else if (type === 'REJECTED') {
        subject = "Farm Visit Request Update - Exotica Farms";
        title = "Update on Your Request";
        message = `Thank you for your interest. Unfortunately, we cannot accommodate your visit at this time. <br><br><strong>Note from Admin:</strong> ${reason || 'No specific reason provided.'}`;
        color = "#c62828";
    }

    const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: ${color};">${title}</h2>
            <p>Hi ${data.name},</p>
            <p>${message}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <div style="font-size: 0.9rem; color: #666;">
                <p><strong>Visit Details:</strong></p>
                <p>Date: ${meta.date || 'TBD'}</p>
                <p>Time: ${meta.time || 'TBD'}</p>
                <p>Visitors: ${meta.visitors || 'N/A'}</p>
            </div>
            <p style="margin-top: 20px;">Regards,<br>Exotica Farms Team</p>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Exotica Farms" <${process.env.SMTP_USER}>`,
            to: data.email,
            subject,
            html: htmlContent,
        });

        // Simulate WhatsApp Message
        await sendWhatsAppMessage(data.phone, `${title}\n\n${message.replace(/<br>/g, '\n')}\n\n- Exotica Farms`);
    } catch (e) {
        console.error("Failed to send user update email", e);
    }
}

export async function sendEnquiryAcknowledgement(data: any) {
    const subject = "Your enquiry has been received – Exotica Farms";
    const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #2e7d32;">Enquiry Received</h2>
            <p>Hello ${data.name},</p>
            <p>Thank you for contacting Exotica Farms.</p>
            <p>We have received your enquiry and our team will get back to you shortly.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <div style="font-size: 0.9rem; color: #666;">
                <p><strong>Your Message:</strong></p>
                <div style="background: #f9f9f9; padding: 12px; border-radius: 8px; margin-top: 5px;">
                    ${data.message}
                </div>
            </div>
            <p style="margin-top: 20px;">Warm regards,<br>Exotica Farms Team</p>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Exotica Farms" <${process.env.SMTP_USER}>`,
            to: data.email,
            subject,
            html: htmlContent,
        });

        // Simulate WhatsApp Message
        await sendWhatsAppMessage(data.phone, `Hello ${data.name}, thank you for contacting Exotica Farms. We have received your enquiry and will get back to you soon.`);
    } catch (e) {
        console.error("Failed to send enquiry acknowledgement email", e);
    }
}

async function sendWhatsAppMessage(phone: string, text: string) {
    if (!phone) return;
    // Log simulation
    console.log(`[WHATSAPP SIMULATION] To: ${phone} | Content: ${text}`);
    // In a real app, you'd use a provider API like Twilio or WhatsApp Business API here.
}

export async function sendDirectReply(email: string, name: string, subject: string, message: string) {
    const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #2e7d32;">Reply from Exotica Farms</h2>
            <p>Hi ${name},</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; line-height: 1.6; color: #333;">
                ${message.replace(/\n/g, '<br>')}
            </div>
            <p>If you have any further questions, feel free to reply to this email.</p>
            <p style="margin-top: 30px;">Best Regards,<br><strong>The Exotica Farms Team</strong></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 11px; color: #999;">Exotica Farms - Sustainable Protected Farming</p>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: `"Exotica Farms" <${process.env.SMTP_USER}>`,
            to: email,
            subject: subject || "Re: Your Enquiry at Exotica Farms",
            html: htmlContent,
        });
        return { success: true };
    } catch (e) {
        console.error("Failed to send direct reply email", e);
        return { success: false };
    }
}
