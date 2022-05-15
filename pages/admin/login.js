import { LockClosedIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Router from 'next/router';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomButton } from '../../components/Inputs/Buttons';
import CustomInput from '../../components/Inputs/CustomInput';
import { adminLogin } from '../../services/AuthService';

export default function AdminLogin() {
    const [error, setError] = useState(null);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChange = ({ target }) =>
        setCredentials({ ...credentials, [target.name]: target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        adminLogin(credentials)
            .then((admin) => {
                localStorage.setItem('admin', JSON.stringify(admin));
                Router.push('/admin/dashboard');
            })
            .catch((error) => setError(error.message));
    };

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <ToastContainer />
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Image
                            width={100}
                            height={100}
                            className="mx-auto h-12 w-auto"
                            src="/images/store-logo.png"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Beljelentkezés az admin felületre
                        </h2>
                    </div>
                    {error && (
                        <div
                            className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                            role="alert">
                            <span className="font-medium">{error}</span>
                        </div>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input
                            type="hidden"
                            name="remember"
                            defaultValue="true"
                        />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <CustomInput
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    required
                                    placeholder="E-mail cím"
                                />
                            </div>
                            <div>
                                <CustomInput
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                    placeholder="Jelszó"
                                />
                            </div>
                        </div>
                        <div>
                            <CustomButton isSubmit={true} classes="w-full">
                                <LockClosedIcon
                                    className="h-5 w-5 text-white mr-3"
                                    aria-hidden="true"
                                />
                                Bejelentkezés
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

