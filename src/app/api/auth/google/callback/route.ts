import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/api/auth/google/callback"
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    return new NextResponse(`
      <html>
        <body style="font-family: sans-serif; padding: 40px; text-align: center; background: #111; color: white;">
          <h2>Google Authorization Successful!</h2>
          <p>Please copy the Refresh Token below and paste it into your <b>.env.local</b> file as <code>GOOGLE_REFRESH_TOKEN</code>:</p>
          <div style="background: #333; padding: 20px; border-radius: 8px; word-break: break-all; margin: 20px auto; max-width: 600px; border: 1px solid #555;">
            ${tokens.refresh_token || "No refresh token returned! You might have authorized it previously. Go to your Google Account -> Security -> Third-party apps, remove access, and try again."}
          </div>
          <p>After saving it to your environment variables, you can close this window!</p>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  } catch (error: any) {
    console.error('Google OAuth Token Exchange Error:', error);
    const errorDetails = error.response?.data || error.message || error;
    console.error('Detailed Error Response:', errorDetails);
    
    return NextResponse.json({ 
      error: 'Failed to exchange token', 
      details: errorDetails 
    }, { status: 500 });
  }
}
