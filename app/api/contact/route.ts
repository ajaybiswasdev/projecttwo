import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    const from = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    if (!apiKey || !to) {
      return NextResponse.json({ error: "The contact service is not configured yet. Please try again later." }, { status: 503 });
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const budget = typeof body.budget === "string" ? body.budget.trim() : "Not specified";
    const details = typeof body.details === "string" ? body.details.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";

    if (company) return NextResponse.json({ success: true });

    if (!name || name.length > 100 || !email || email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        !details || details.length > 5000 || budget.length > 80) {
      return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
    }

    const text = [
      "New portfolio enquiry", "",
      "Name: " + name,
      "Email: " + email,
      "Estimated budget: " + (budget || "Not specified"), "",
      "Project details:", details
    ].join("\n");

    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: [to], reply_to: email,
        subject: "Portfolio enquiry from " + name, text
      })
    });

    if (!sent.ok) {
      console.error("Resend API error:", sent.status, await sent.text());
      return NextResponse.json({ error: "We couldn't send your enquiry right now. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
