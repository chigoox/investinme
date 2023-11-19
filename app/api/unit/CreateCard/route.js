import { NextResponse } from "next/server";

export async function POST(request) {
    console.log('card')


  let customerInfo = await request.json();
  console.log(customerInfo)
  const TOKEN = process.env.UNITTOKEN
    const phisicalCard = await fetch(`https://api.s.unit.sh/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body:JSON.stringify(customerInfo)
    });

    customerInfo = {...customerInfo, data:{...customerInfo.data, attributes:{}, type: 'individualVirtualDebitCard'}}

    const virtualCard = await fetch(`https://api.s.unit.sh/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      body:JSON.stringify(customerInfo)
    });


    let pCARD = await phisicalCard.json();
    let vCARD = await virtualCard.json();
    
    if (pCARD.errors) pCARD = pCARD.errors[0]
    if (vCARD.errors) vCARD = vCARD.errors[0]
    return NextResponse.json({phisicalCard: pCARD, virtualCard: vCARD})
    
  

}