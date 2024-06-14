// export const GLOBAL_URL = 'https://192.168.1.205/nfdc-development/api/';
export const GLOBAL_URL = 'https://192.168.1.235/new/nfdc-development/api/';
// export const GLOBAL_URL = 'https://192.168.1.91/nfdc-development/api/';
// export const GLOBAL_URL = 'http://192.168.1.5/nfdc-development/api/';
// export const GLOBAL_URL = 'http://192.168.1.25/nfdc-development/api/' ;

// 192.168.175.161


// export const GLOBAL_URL = 'http://192.168.1.4/new/nfdc-development/api/';
// export const GLOBAL_URL = 'https://192.168.175.161/new/nfdc-development/api/';



export const IP_URL = `${GLOBAL_URL}ip/`;

export const postRequestGlobal = async (endpoint, data) => {
    const response = await fetch(`${GLOBAL_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const returndata = await response.json();
    return returndata;
}

export const getRequestGlobal = async (endpoint, data) => {
    const response = await fetch(`${IP_URL}${endpoint}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const returndata = await response.json();
    return returndata;
}

export const patchRequestGlobal = async () => {

}

export const deleteRequestGlobal = async () => {

}
