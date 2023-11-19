import { NextResponse } from "next/server";

export async function POST(request) {
    console.log('card')
  const customerInfo = await request.json();
  console.log(customerInfo)
  const TOKEN = process.env.UNITTOKEN
    const response = await fetch(`https://api.s.unit.sh/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body:JSON.stringify(customerInfo)
    });


    const card = await response.json();
    if (card.errors) throw new Error(card.errors)
    return NextResponse.json(bank)
    
  

}