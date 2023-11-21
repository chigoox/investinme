import { NextResponse } from "next/server";

export async function POST(request) {
    let { customerID, data } = await request.json();
    data = { data: { ...data } }


    const TOKEN = process.env.UNITTOKEN;
    const response = await fetch(
        `https://api.s.unit.sh/customers/${customerID}/token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/vnd.api+json",
                Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(data),
        }
    );
    const token = await response.json();
    if (token.errors) throw new Error(token.errors);
    return NextResponse.json(token);
}
