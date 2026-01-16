import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, message, type } = await request.json();

        if (!email || !message) {
            return NextResponse.json(
                { error: 'Email and message are required' },
                { status: 400 }
            );
        }

        // Send to Klaviyo as a custom event
        const klaviyoApiKey = process.env.KLAVIYO_PRIVATE_KEY;

        if (klaviyoApiKey) {
            await fetch('https://a.klaviyo.com/api/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': klaviyoApiKey,
                },
                body: JSON.stringify({
                    token: klaviyoApiKey,
                    event: 'Inquiry Submitted',
                    customer_properties: {
                        $email: email,
                        $first_name: name?.split(' ')[0] || '',
                        $last_name: name?.split(' ').slice(1).join(' ') || '',
                        $phone_number: phone || '',
                    },
                    properties: {
                        inquiry_type: type || 'general',
                        message: message,
                        source: 'website',
                    },
                }),
            });
        }

        // Optional: Send email notification via SendGrid, Resend, or similar
        const resendApiKey = process.env.RESEND_API_KEY;

        if (resendApiKey) {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${resendApiKey}`,
                },
                body: JSON.stringify({
                    from: 'inquiries@monterin.com',
                    to: 'contact@monterin.com',
                    subject: `New Inquiry from ${name || email}`,
                    html: `
            <h2>New Website Inquiry</h2>
            <p><strong>From:</strong> ${name || 'Unknown'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Type:</strong> ${type || 'General'}</p>
            <hr />
            <p>${message}</p>
          `,
                }),
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Inquiry submitted successfully',
        });
    } catch (error) {
        console.error('Inquiry error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
