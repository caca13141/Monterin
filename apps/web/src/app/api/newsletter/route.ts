import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        // Brevo (Sendinblue) Integration - FREE: 300 emails/day
        const brevoApiKey = process.env.BREVO_API_KEY;

        if (brevoApiKey) {
            try {
                const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': brevoApiKey,
                    },
                    body: JSON.stringify({
                        email,
                        listIds: [2], // Default list ID, update with your actual ID
                        updateEnabled: true,
                        attributes: {
                            DOUBLE_OPT_IN: false,
                        },
                    }),
                });

                if (!brevoResponse.ok && brevoResponse.status !== 400) {
                    // 400 means contact already exists, which is fine
                    console.error('Brevo error:', await brevoResponse.text());
                }
            } catch (error) {
                console.error('Brevo integration error:', error);
            }
        }

        // Mailchimp Integration (Alternative)
        const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
        const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
        const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

        if (mailchimpApiKey && mailchimpListId && mailchimpServerPrefix) {
            try {
                const mailchimpResponse = await fetch(
                    `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Basic ${Buffer.from(`anystring:${mailchimpApiKey}`).toString('base64')}`,
                        },
                        body: JSON.stringify({
                            email_address: email,
                            status: 'subscribed',
                            tags: ['Montérin Website'],
                        }),
                    }
                );

                if (!mailchimpResponse.ok && mailchimpResponse.status !== 400) {
                    console.error('Mailchimp error:', await mailchimpResponse.text());
                }
            } catch (error) {
                console.error('Mailchimp integration error:', error);
            }
        }

        // PostHog tracking should be done on client-side or using posthog-node

        return NextResponse.json({
            success: true,
            message: 'Successfully subscribed to newsletter',
        });
    } catch (error) {
        console.error('Newsletter signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
