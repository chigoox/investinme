import { NextResponse } from "next/server";

export async function POST(request) {
  const datain = await request.json();

  const TOKEN = process.env.UNITTOKEN
  const response = await fetch(`https://api.s.unit.sh/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(datain)
  });


  const bank = await response.json();
  if (bank.errors) return NextResponse.json(bank.errors[0])
  return NextResponse.json(bank)



}