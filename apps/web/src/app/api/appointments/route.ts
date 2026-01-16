import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, date, time, service, message } = await request.json();

        if (!email || !name || !date || !time) {
            return NextResponse.json(
                { error: 'Name, email, date, and time are required' },
                { status: 400 }
            );
        }

        // Send to Brevo/email service
        const brevoApiKey = process.env.BREVO_API_KEY;
        const resendApiKey = process.env.RESEND_API_KEY;

        // Track in Brevo as event
        if (brevoApiKey) {
            try {
                await fetch('https://api.brevo.com/v3/smtp/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': brevoApiKey,
                    },
                    body: JSON.stringify({
                        sender: { email: 'system@monterin.com', name: 'Montérin System' },
                        to: [{ email: 'appointments@monterin.com' }],
                        subject: `New Appointment Request - ${name}`,
                        htmlContent: `
              <h2>New Appointment Request</h2>
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
              <p><strong>Service:</strong> ${service}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p>${message || 'No additional notes'}</p>
            `,
                    }),
                });
            } catch (error) {
                console.error('Brevo error:', error);
            }
        }

        // Alternative: Resend
        if (resendApiKey && !brevoApiKey) {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${resendApiKey}`,
                },
                body: JSON.stringify({
                    from: 'appointments@monterin.com',
                    to: 'contact@monterin.com',
                    subject: `New Appointment Request - ${name}`,
                    html: `
            <h2>New Appointment Request</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Service:</strong> ${service}</p>
            <hr />
            <p>${message || 'No additional notes'}</p>
          `,
                }),
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Appointment request received',
        });
    } catch (error) {
        console.error('Appointment error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
