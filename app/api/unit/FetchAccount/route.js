import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request) {

  const { accountID, customerID, vCardID, uToken } = await request.json()

  const TOKEN = process.env.UNITTOKEN


  const account = await fetch(`https://api.s.unit.sh/accounts/${accountID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
    },
  });

  let data1 = await account.json();
  if (data1.errors) data1 = data1.errors[0]


  const history = await fetch(`https://api.s.unit.sh/account-end-of-day?page[limit]=365&page[offset]=0&filter[customerId]=${customerID}&filter[accountId]=${accountID}&filter[since]=2020-10-11`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
    },
  });

  let data2 = await history.json();
  if (data2.errors) data2 = data2.errors[0]


  const cardPK = await fetch(`https://api.s.unit.sh/cards/${vCardID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${uToken}`,
    },
  });

  let data3 = await cardPK.json();
  if (data3.errors) data3 = data3.errors[0]


  const transactions = await fetch(`https://api.s.unit.sh/transactions?page[limit]=500&[customerId]=${customerID}&filter[accountId]=${accountID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${uToken}`,
    },
  });

  let data4 = await transactions.json();
  if (data4.errors) data4 = data4.errors[0]



  return NextResponse.json({ account: data1, history: data2, vcardPK: data3, transactions: data4 })



}