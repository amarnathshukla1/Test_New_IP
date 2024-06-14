import { IP_URL } from "./global";

export const postRequest = async (endpoint, data) => {

    const token = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    const response = await fetch(`${IP_URL}${endpoint}`, {
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            Authorization: 'Bearer ' + token
        },
        body: formData
    });
    const returndata = await response.json();
    return returndata;
}

export const getRequest = async (endpoint, data) => {
    const token = localStorage.getItem('token');
    // console.log(data);
    const params = new URLSearchParams(data);

    const response = await fetch(`${IP_URL}${endpoint}?${params}`, {
        method: "get",
        headers: {
            // "Content-Type": "application/json",
            Authorization: 'Bearer ' + token
        },
    });
    // console.log(IP_URL, "url")
    const returndata = await response.json();
    //  console.log(returndata);
    return returndata;
}

export const patchRequest = async () => {

}

export const deleteRequest = async () => {

}

