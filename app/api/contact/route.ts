import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Log the submission (for debugging)
    console.log("[Contact Form Submission]", {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    })

    // Here you would typically:
    // 1. Send the data to your CRM or database
    // 2. Send a notification email to your team
    // 3. Send a confirmation email to the user

    // Example: Forward to your custom API
    // const apiResponse = await fetch('https://your-api.com/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, message }),
    // })

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[Contact Form Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
