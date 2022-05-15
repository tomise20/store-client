import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { Fragment } from 'react';
import { classNames, currencyFormat } from '../../libs/helper';
import { CustomButton } from '../Inputs/Buttons';

export default function ProductDetails({ open, close, product, addToCart }) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto" onClose={close}>
                <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        enterTo="opacity-100 translate-y-0 md:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 md:scale-100"
                        leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
                        <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                            <div className="w-full relative flex items-center bg-white overflow-hidden shadow-2xl">
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                    onClick={() => close()}>
                                    <span className="sr-only">Close</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                <div className="w-full grid gap-y-0 md:gap-y-8 gap-x-6 items-stretch grid-cols-12 lg:gap-x-8 items-center">
                                    <div className="relative overflow-hidden col-span-12 md:col-span-5 w-full h-full p-3 md:p-5">
                                        <div className="md:absolute md:top-1/2 md:-translate-y-1/2 text-center">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={300}
                                                height={300}
                                                objectFit="contain"
                                                objectPosition="center"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-7">
                                        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                            <div className="max-w-md w-full">
                                                <div className="mb-1 flex items-center">
                                                    <h2 className="text-2xl text-gray-600 font-bold mb-1 mr-3">
                                                        {product.name}
                                                    </h2>
                                                    <span>|</span>
                                                    <span className="text-xl font-light mb-0 ml-3">
                                                        {currencyFormat(product.price)}
                                                    </span>
                                                </div>
                                                <p
                                                    className={classNames(
                                                        product.stock > 0 ? 'text-green-600' : 'text-red-500',
                                                        'font-bold text-indigo-600 uppercase text-sm'
                                                    )}>
                                                    {product.stock > 0 ? 'Elérhető' : 'Elfogyott'}
                                                </p>
                                                <div className="my-3">{product.description}</div>
                                                <div className="w-full">
                                                    <CustomButton
                                                        handler={() => addToCart(product.id)}
                                                        isSubmit={false}
                                                        classes="w-full mb-3 md:mb-0 border border-indigo-600">
                                                        <ShoppingCartIcon className="w-5 h-5 text-white-600 mr-3" />
                                                        Kosárba
                                                    </CustomButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

