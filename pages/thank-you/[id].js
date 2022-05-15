import { ArrowLeftIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import CartItem from '../../components/Cart/CartItem';
import { CustomButton } from '../../components/Inputs/Buttons';
import Layout from '../../components/Layout';
import { currencyFormat } from '../../libs/helper';
import { findById } from '../../services/OrderService';

export default function ThankYou({ order }) {
    const auth = useSelector((state) => state.auth);

    return (
        <>
            <div className="container px-5 xl:max-w-7xl mb-5">
                <div className="text-center my-10">
                    <h1 className="text-3xl text-black font-bold mb-5">
                        <span className="text-green-500 uppercase">
                            Gratulálunk!
                        </span>{' '}
                        Rendelésedet sikeresen befogadtuk.
                    </h1>
                    <div className="flex">
                        <div className="w-1/2">
                            <div className="text-gray-800 text-lg">
                                Foglalés dátuma
                            </div>
                            <div className="font-bold">{order.createdAt}</div>
                        </div>
                        <div className="w-1/2">
                            <div className="text-gray-800 text-lg">
                                Foglalás értéke
                            </div>
                            <div className="font-bold">
                                {currencyFormat(order.totalPrice)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    {order.items.map((item) => (
                        <CartItem key={item.id} item={item} isOrder={true} />
                    ))}
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    <Link href="/">
                        <a>
                            <CustomButton isSubmit={false}>
                                <ArrowLeftIcon
                                    className="h-5 w-5 text-white mr-3"
                                    aria-hidden="true"
                                />
                                Vissza a főoldalra
                            </CustomButton>
                        </a>
                    </Link>
                    {auth.user?.id && (
                        <Link href="/profile">
                            <a>
                                <CustomButton>
                                    <UserCircleIcon
                                        className="h-5 w-5 text-white mr-3"
                                        aria-hidden="true"
                                    />
                                    Tovább a profilomra
                                </CustomButton>
                            </a>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

ThankYou.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
    const order = await findById(context.params.id);

    return {
        props: {
            order,
        },
    };
}

