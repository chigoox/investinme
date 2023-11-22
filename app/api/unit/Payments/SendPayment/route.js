import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();

    const TOKEN = process.env.UNITTOKEN
    const response = await fetch(`https://api.s.unit.sh/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(data)
    });


    const paymentConfirm = await response.json();
    console.log(paymentConfirm)
    if (paymentConfirm.errors) return NextResponse.json(paymentConfirm.errors[0])
    return NextResponse.json(paymentConfirm)



}