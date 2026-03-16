export async function GET() {
  return Response.json({
    status: "Backend working",
    platform: "Vercel"
  });
}
