import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';
import LoginModal from '../components/Auth/LoginModal';
import RegistrationModal from '../components/Auth/RegistrationModal';

export default function Login({ closeModal, modalType, openModal, onChangeModalType }) {
    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
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
                        <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-lg md:px-4 md:my-8 md:align-middle">
                            <div className="w-full relative flex items-center bg-white overflow-hidden shadow-2xl">
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                    onClick={() => closeModal()}>
                                    <span className="sr-only">Close</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {modalType === 'login' ? (
                                    <LoginModal changeModalType={onChangeModalType} closeModal={closeModal} />
                                ) : (
                                    <RegistrationModal changeModalType={onChangeModalType} closeModal={closeModal} />
                                )}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

