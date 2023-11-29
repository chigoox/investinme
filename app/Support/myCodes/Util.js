
import Toastify from 'toastify-js'
import { v4 as uuidv4 } from 'uuid';
import { fetchDocument } from './Database';
import { createUnAuthTokens, verifiToken } from './UnitUtils';

export const isDev = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return true
    } else {
        return false
    }
}

export const notify = (notification, duration = 5000) => {
    Toastify({
        text: notification,
        duration: duration,
        className: "bg-red-900 border-gray-700 border bg-black-800",
        // destination: "https://github.com/apvarun/toastify-js",
        // newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, black, #121212)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
};

export function handleInput5(key, value, stateSetter) {
    //const key = target.name
    // const value = target.value


    try {
        stateSetter((old) => {
            return { ...old, [key]: value }
        })
    } catch {
        if (!stateSetter) {
            console.log('need stateSetter')
        }
    }

}

export const filterNullFromArray = (array) => {
    return array.filter(x => !!x)
}

export function disableScroll(enable = true, name = "scroll-able") {
    if (enable) document.querySelector(`.${name}`).classList.add('disablScroll');
    if (!enable) document.querySelector(`.${name}`).classList.remove('disablScroll');
    console.log(enable)
}

export const getRand = (max = 99999) => { return Math.floor(Math.random() * max) + 1; }

export function getRandTN(size = 7) {
    const result = Math.random().toString(36).substring(2, size < 7 ? 7 : size);
    return result;

}

export const filterObject = (obj, filterFunc) => {
    Object.filter = (obj, predicate) =>
        Object.keys(obj)
            .filter(key => predicate(obj[key]))
            .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

    var filtered = Object.filter(obj, filterFunc);
    return (filtered);

}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const createArray = (length) => {
    const newArray = Array.from({ length: length }, (value, index) => index)

    return newArray
}

export const makeUniq = (array) => {
    return [...new Set(array)]

}

export const formatNumber = (num) => {
    if (num < 1000) return num
    if (num >= 1000000000) return String(num / 1000000000).substring(0, 5) + 'B'
    if (num >= 1000000) return String(num / 1000000).substring(0, 5) + 'M'
    if (num >= 1000) return (String(num / 1000).substring(0, 5) + 'K')
}

export const getUUID = () => {
    return uuidv4()
}

export const genToken = async (UID, auth) => {
    //generates untoken (saved to localstorage) if auth is passed 
    //reset-time, and generates verification token to make auth token
    const now = new Date().getTime()
    localStorage?.setItem('TokenTimeStamp2', now);
    const { customerID } = await fetchDocument('Users', UID)
    const uToken = await createUnAuthTokens(customerID)
    console.log(uToken)
    localStorage.setItem("uToken", `${uToken}`)
    if (auth) localStorage?.setItem('TokenTimeStamp', now);
    const tokenVerification = (auth) ? await verifiToken(customerID) : null
    if (auth) return tokenVerification
    console.log('first')
}

export const clearTokens = (all) => {
    const hours = 0.25;
    const now = new Date().getTime();
    const setupTime = localStorage?.getItem('TokenTimeStamp');
    if (setupTime == null) {
        if (localStorage?.getItem('aToken')) localStorage?.removeItem('aToken');

    } else {
        if (now - setupTime > hours * 60 * 60 * 1000) {
            localStorage?.removeItem('TokenTimeStamp');
            localStorage?.removeItem('aToken');
            if (localStorage?.getItem('TokenTimeStamp2') == 'null') localStorage?.removeItem('uToken');
        }
        if (now - setupTime > 24 * 60 * 60 * 1000) {
            localStorage.setItem('idempotencyKey', uuidv4())
            localStorage?.removeItem('TokenTimeStamp2');
            if (all) localStorage?.removeItem('uToken');
        }
    }
}

export const clearTokensAtLogin = (all) => {

    localStorage.removeItem('idempotencyKey')
    localStorage?.removeItem('TokenTimeStamp2');
    localStorage?.removeItem('TokenTimeStamp');
    localStorage?.removeItem('uToken');
    localStorage?.removeItem('aToken');

}


