/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { currencyFormat } from '../../libs/helper';
import CartItem from './CartItem';

function ShoppingCart({ open, handleShoppingCart }) {
    const cart = useSelector((state) => state.cart);
    const router = useRouter();

    const goToCheckout = () => {
        handleShoppingCart(false);
        router.push('/checkout');
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden z-10" onClose={() => handleShoppingCart(false)}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full">
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">
                                                Bevásárló kosár{' '}
                                            </Dialog.Title>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={() => handleShoppingCart(false)}>
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                {cart.items.length > 0 ? (
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {cart.items.map((product) => (
                                                            <CartItem key={product.id} item={product} />
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="text-xl text-red-500 uppercase text-center">
                                                        A kosarad üres!
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Részösszeg</p>
                                            <p>{currencyFormat(cart.total_price)}</p>
                                        </div>
                                        <div className="mt-6">
                                            <button
                                                className="w-full group-hover:animate-add_to_cart flex items-center justify-center bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700"
                                                onClick={goToCheckout}
                                                disabled={cart.items.length === 0}>
                                                Pénztár{' '}
                                                <ArrowRightIcon className="group-hover:animate-add_to_cart w-4 h-4 text-white ml-3" />
                                            </button>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                vagy{' '}
                                                <button
                                                    type="button"
                                                    className="font-medium text-sky-600 hover:text-sky-800"
                                                    onClick={() => handleShoppingCart(false)}>
                                                    Vásárlás folytatása
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default dynamic(() => Promise.resolve(ShoppingCart), { ssr: false });

