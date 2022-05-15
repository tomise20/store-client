/* This example requires Tailwind CSS v2.0+ */
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions';
import Login from '../../widgets/Login';
import LoadingScreen from '../LoadingScreen';

export default function Navbar({ handleShoppingCart }) {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
    const [modalType, setModalType] = useState('login');
    const router = useRouter();

    const closeLoginModal = () => setIsOpenLoginModal(false);

    const signOut = (e) => {
        e.preventDefault();

        dispatch(logout()).then(() => {
            router.push('/');
        });
    };

    const openModal = (e, type) => {
        e.preventDefault();
        setModalType(type);
        setIsOpenLoginModal(true);
    };

    const changeModalType = (e, type) => {
        e.preventDefault();
        setModalType(type);
    };

    const openShoppingCart = () => {
        handleShoppingCart();
    };

    if (auth.loading) {
        return <LoadingScreen isLoading={auth.loading} />;
    }

    return (
        <>
            <Popover className="relative z-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <Link href="/">
                                <a>
                                    <span className="sr-only">Workflow</span>
                                    <Image
                                        priority
                                        src="/images/store-logo.png"
                                        alt="Store"
                                        width={50}
                                        height={50}
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <MenuIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </Popover.Button>
                        </div>
                        <Popover.Group
                            as="nav"
                            className="hidden md:flex space-x-10">
                            <Link href="/">
                                <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Főoldal
                                </a>
                            </Link>
                            <Link href="/products">
                                <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Termékek
                                </a>
                            </Link>
                            <Link href="#">
                                <a
                                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                                    onClick={openShoppingCart}>
                                    <ShoppingBagIcon
                                        className="h-5 w-5 text-gray-500 hover:text-gray-900"
                                        aria-hidden="true"
                                    />
                                </a>
                            </Link>
                        </Popover.Group>
                        {!auth.user.id ? (
                            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                                <button
                                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 mr-4"
                                    onClick={(e) => openModal(e, 'login')}>
                                    {' '}
                                    Belépés
                                </button>
                                <button
                                    href="#"
                                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                                    onClick={(e) => openModal(e, 'register')}>
                                    Regisztráció
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                                <Link href="/profile">
                                    <a className='className="whitespace-nowrap mr-8 text-base font-medium text-gray-500 hover:text-gray-900"'>
                                        Profil
                                    </a>
                                </Link>
                                <button
                                    className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                                    onClick={(e) => signOut(e)}>
                                    {' '}
                                    Kijelentkezés
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">
                    <Popover.Panel
                        focus
                        className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Image
                                            priority
                                            src="/images/store-logo.png"
                                            alt="Store"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">
                                                Close menu
                                            </span>
                                            <XIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-8">
                                        <Link href="#">
                                            <a
                                                href="#"
                                                className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                                                <span className="ml-3 text-base font-medium text-gray-900">
                                                    Főoldal
                                                </span>
                                            </a>
                                        </Link>
                                        <Link href="/products">
                                            <a className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                                                <span className="ml-3 text-base font-medium text-gray-900">
                                                    Termékek
                                                </span>
                                            </a>
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                            <div className="py-6 px-5 space-y-6">
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    <Link href="#">
                                        <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                                            ÁSZF
                                        </a>
                                    </Link>
                                    <Link href="#">
                                        <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                                            Adatvédelem
                                        </a>
                                    </Link>
                                </div>
                                <div>
                                    {!auth && !auth.id ? (
                                        <>
                                            <button
                                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700"
                                                onClick={(e) =>
                                                    openModal(e, 'login')
                                                }>
                                                Belépés
                                            </button>
                                            <p className="my-3 block text-center">
                                                Or
                                            </p>
                                            <button
                                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700"
                                                onClick={(e) =>
                                                    openModal(e, 'register')
                                                }>
                                                Regisztráció
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/profile">
                                                <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700 mb-3">
                                                    Profil
                                                </a>
                                            </Link>
                                            <button
                                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700"
                                                onClick={(e) => signOut(e)}>
                                                Kijelentkezés
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>

            <Login
                openModal={isOpenLoginModal}
                closeModal={closeLoginModal}
                modalType={modalType}
                onChangeModalType={changeModalType}
            />
        </>
    );
}

