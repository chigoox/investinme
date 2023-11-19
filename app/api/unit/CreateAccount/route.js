import { NextResponse } from "next/server";

export async function POST(request) {
  const datain = await request.json();
  
  const TOKEN = process.env.UNITTOKEN
    const response = await fetch(`https://api.s.unit.sh/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body:JSON.stringify(datain)
    });


    const data = await response.json();
    if (data.errors) console.log(data.errors)
    return NextResponse.json(data)
    
  

}