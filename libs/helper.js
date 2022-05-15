import { toast } from 'react-toastify';

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function showNotification(message, type = 'success', closeTime = 5000) {
    return toast[type](message, {
        position: 'bottom-right',
        autoClose: closeTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function currencyFormat(value) {
    return new Intl.NumberFormat('hu-HU', {
        style: 'currency',
        currency: 'HUF',
    }).format(value);
}

export function getErrors(error) {
    const errors = [];
    for (const [key, value] of Object.entries(error)) {
        errors.push(value);
    }

    return errors;
}

