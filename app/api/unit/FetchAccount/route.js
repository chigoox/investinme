import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {
  let data = await request.json();
  const {accountID} = data
    console.log(accountID)

  const TOKEN = process.env.UNITTOKEN
    
   try {
    const response = await fetch(`https://api.s.unit.sh/accounts/${accountID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
      },
    });

    const {data} = await response.json();
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Error fetching account:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }

}