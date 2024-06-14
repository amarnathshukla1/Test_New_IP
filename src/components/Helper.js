export const convertDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const validateEmail = (email) => {
    const emailProducerRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailProducerRegex.test(email))
        return true
    return false;
};
export const handleKeyDown = (event) => {
    // Prevent the letter 'e', '+', '-', '.' and other non-numeric characters
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
        event.preventDefault();
    }
};
