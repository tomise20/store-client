import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../../libs/helper';
import { registrationRequest } from '../../redux/actions';
import { CustomButton } from '../Inputs/Buttons';
import CustomInput from '../Inputs/CustomInput';

export default function RegistrationModal({ closeModal, changeModalType }) {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: '',
        name: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onSignUp = (e) => {
        e.preventDefault();

        if (user.password !== user.password_confirmation) {
            setError('A két jelszó nem eggyezik!');
            return false;
        }

        dispatch(registrationRequest(user))
            .then(() => {
                closeModal();
                showNotification('Sikeres regisztráció!');
            })
            .catch((err) => {
                showNotification(err);
            });
    };

    const onChangeToSignIn = (e) => {
        changeModalType(e, 'login');
    };

    return (
        <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-stretch sm:grid-cols-12 lg:gap-x-8">
            <div className="col-span-12">
                <div className="min-h-full flex items-center justify-center p-4">
                    <div className="w-full space-y-4">
                        <div className="text-center">
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Regisztráció
                            </h2>
                        </div>
                        {(auth.error || error) && (
                            <div
                                className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert">
                                <span className="font-medium">
                                    {auth.error ?? error}
                                </span>
                            </div>
                        )}
                        <form onSubmit={onSignUp}>
                            <input
                                type="hidden"
                                name="remember"
                                defaultValue="true"
                            />
                            <div className="shadow-sm -space-y-px">
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <CustomInput
                                            type="text"
                                            name="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            placeholder="Név"
                                            required
                                        />
                                    </div>
                                    <div className="">
                                        <CustomInput
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            placeholder="E-mail cím"
                                            required
                                        />
                                    </div>
                                    <div className="">
                                        <CustomInput
                                            type="address"
                                            name="address"
                                            value={user.address}
                                            onChange={handleChange}
                                            placeholder="Cím"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <CustomInput
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            placeholder="Jelszó"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <CustomInput
                                            type="password"
                                            name="password_confirmation"
                                            value={user.password_confirmation}
                                            onChange={handleChange}
                                            placeholder="Jelszó újra"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <CustomButton isSubmit={true} classes="w-full">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-white mr-3"
                                        aria-hidden="true"
                                    />
                                    Regisztráció
                                </CustomButton>
                            </div>
                            <div className="my-2">
                                <p className="text-center">Vagy</p>
                            </div>
                            <div>
                                <CustomButton
                                    isSubmit={false}
                                    handler={onChangeToSignIn}
                                    classes="w-full">
                                    <UserCircleIcon
                                        className="h-5 w-5 text-white"
                                        aria-hidden="true"
                                    />
                                    Belépés
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

