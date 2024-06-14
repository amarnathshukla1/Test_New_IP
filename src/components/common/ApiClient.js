// src/utils/apiClient.js
import { useNavigate } from 'react-router-dom';
import { IP_URL } from '../../API/global';

const ApiClient = () => {
    const navigate = useNavigate();

    const request = async (endpoint, options = {}) => {

        try {
            const token = localStorage.getItem('token');
            // console.log(data);
            const params = new URLSearchParams(options);

            const response = await fetch(`${IP_URL}${endpoint}?${params}`, {
                method: "get",
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token
                },
            });
            // console.log(IP_URL, "url")


            if (response.status == 401) {
                localStorage.removeItem('token');
                navigate('/'); // Redirect to login page
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();
            return data;
        } catch (error) {
            localStorage.removeItem('token');
            console.error('API request error:', error);
            throw error;
        }
    };
    const deleteRequest = async (endpoint, options = {}) => {

        try {
            const token = localStorage.getItem('token');
            // console.log(data);

            const response = await fetch(`${IP_URL}${endpoint}`, {
                method: "DELETE",
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token
                },
            });
            // console.log(IP_URL, "url")


            if (response.status == 401) {
                localStorage.removeItem('token');
                navigate('/'); // Redirect to login page
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();
            return data;
        } catch (error) {
            localStorage.removeItem('token');
            console.error('API request error:', error);
            throw error;
        }
    };
    const getRequest = async (endpoint, options = {}) => {

        try {
            const token = localStorage.getItem('token');
            // console.log(data);
            const params = new URLSearchParams(options);

            const response = await fetch(`${IP_URL}${endpoint}?${params}`, {
                method: "get",
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token
                },
            });
            // console.log(IP_URL, "url")


            if (response.status === 401) {
                localStorage.removeItem('token');
                navigate('/'); // Redirect to login page
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    };
    const postRequest = async (endpoint, options = {}) => {

        const formData = new FormData();
        for (const key in options) {
            formData.append(key, options[key]);
        }
        try {
            const token = localStorage.getItem('token');
            console.log({ token });

            const response = await fetch(`${IP_URL}${endpoint}`, {
                method: "post",
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token
                },
                body: formData
            });
            // console.log(IP_URL, "url")


            if (response.status === 401) {
                navigate('/'); // Redirect to login page
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    };
    const putRequest = async (endpoint, options = {}) => {


        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${IP_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(options)
            });
            // console.log(IP_URL, "url")


            if (response.status === 401) {
                navigate('/'); // Redirect to login page
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    };
    const patchRequest = async (endpoint, options = {}) => {

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${IP_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(options)
            });
            // console.log(IP_URL, "url")


            if (response.status === 401) {
                navigate('/'); // Redirect to login page
                return;
            }

            // Parse JSON response if the status code is not 401
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    };

    return { request, postRequest, getRequest, putRequest, deleteRequest, patchRequest };
};

export default ApiClient;
