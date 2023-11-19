import { message } from "antd";
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


    let data = await response.json();
    if (data.errors) data = data.errors[0]
    return NextResponse.json( data)
    
  

}