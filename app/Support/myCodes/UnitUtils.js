import { message } from "antd";

export const createUnAuthTokens = async (customerID) => {
    try {
        const Token = await fetch("/api/unit/Tokens/CreateCustomerToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    type: "customerToken",
                    attributes: {
                        scope:
                            "customers accounts cards transactions statements payments webhooks rewards",
                    },
                },
                customerID: customerID,
            }),
        });
        const { data } = await Token?.json();
        const uToken = data.attributes.token;
        return uToken;
    } catch (error) {
    }
};




export const createAuthTokens = async (verificationToken, verificationCode, customerID) => {
    try {
        const Token = await fetch("/api/unit/Tokens/CreateCustomerToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    type: "customerToken",
                    attributes: {
                        scope:
                            "cards-sensitive payments-write payments-write-counterparty payments-write-linked-account payments-write-ach-debit ach-payments-write wire-payments-write",
                        verificationToken: verificationToken,
                        verificationCode: verificationCode,
                    },
                },
                customerID: customerID,
            }),
        });
        const { data } = await Token?.json();
        const aToken = data.attributes.token;
        return aToken;
    } catch (error) {
        message.error('Wrong Code')

    }
};




export const verifiToken = async (customerID) => {
    try {
        const verification = await fetch("/api/unit/Tokens/VerifyToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    type: "customerTokenVerification",
                    attributes: {
                        channel: "sms"
                    }
                },
                customerID: customerID,
            }),
        });
        const { data } = await verification?.json();
        const tokenVerification = data.attributes.verificationToken
        return tokenVerification;
    } catch (error) {
    }
};

export const fetchBankAccount = async (accountID, customerID, vCardID, uToken) => {
    const bank = await fetch("/api/unit/FetchAccount", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accountID: accountID,
            customerID: customerID,
            vCardID: vCardID,
            uToken: uToken
        }),
    });
    const { account, history, vcardPK, transactions } = await bank?.json();

    return { account: { ...account.data }, history: { ...history.data }, vcardPK: { ...vcardPK.data }, transactions: { ...transactions.data } }
}

export const sendPayment = async (amount, description, myAccountID, OtherAccountID, idempotencyKey) => {
    const payment = await fetch("/api/unit/Payments/SendPayment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: {
                type: "bookPayment",
                attributes: {
                    amount: amount,
                    description: description || '',
                    idempotencyKey: idempotencyKey
                },
                relationships: {
                    account: {
                        data: {
                            type: "depositAccount",
                            id: myAccountID
                        }
                    },
                    counterpartyAccount: {
                        data: {
                            type: "depositAccount",
                            id: OtherAccountID
                        }
                    }
                }
            }
        }),
    });
    const paymentConfirm = await payment?.json();
    return { payment: { ...paymentConfirm } }

}