
export const GLOBAL_URL = `${process.env.REACT_APP_BASE_URL}/api/`;


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
