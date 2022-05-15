import { LockClosedIcon, UserAddIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../libs/helper';
import { fetchUser } from '../../redux/actions';
import { CustomButton } from '../Inputs/Buttons';
import CustomInput from '../Inputs/CustomInput';

export default function LoginModal({ closeModal, changeModalType }) {
    const auth = useSelector((stat) => stat.auth);
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const onSignIn = (e) => {
        e.preventDefault();

        dispatch(fetchUser(credentials));
        closeModal();
    };

    const onChangeToSingUp = (e) => {
        changeModalType(e, 'register');
    };

    return (
        <div className="w-full grid gap-y-8 gap-x-6 items-stretch grid-cols-12 lg:gap-x-8">
            <div className="sm:col-span-12">
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-4">
                        <div className="text-center">
                            <Image priority src="/images/store-logo.png" alt="Store" width={100} height={100} />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Lépj be és add le rendelés még gyorsabban!
                            </h2>
                        </div>
                        <p
                            className={classNames(
                                auth.error.length > 0 ? 'block' : 'hidden',
                                'text-red-600 text-sm text-center font-bold mt-3'
                            )}>
                            Error!
                        </p>
                        <form className="space-y-6" onSubmit={onSignIn}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="mb-4">
                                    <label htmlFor="email-address" className="sr-only">
                                        Email cím
                                    </label>
                                    <CustomInput
                                        type="email"
                                        name="email"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        placeholder="E-mail cím"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Jelszó
                                    </label>
                                    <CustomInput
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        placeholder="Jelszó"
                                    />
                                </div>
                            </div>
                            <div>
                                <CustomButton isSubmit={true}>
                                    <LockClosedIcon
                                        className="h-5 w-5 text-white group-hover:text-sky-400 mr-2"
                                        aria-hidden="true"
                                    />
                                    Belépés
                                </CustomButton>
                                <p className="my-2 text-center">Vagy</p>
                                <CustomButton isSubmit={false} handler={onChangeToSingUp}>
                                    <UserAddIcon
                                        className="h-5 w-5 text-white group-hover:text-sky-400 mr-2"
                                        aria-hidden="true"
                                    />
                                    Regisztráció
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

