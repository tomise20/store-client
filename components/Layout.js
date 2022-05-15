import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCart } from '../redux/actions';
import { loginSuccessful } from '../redux/types';
import ShoppingCart from './Cart/ShoppingCart';
import LoadingScreen from './LoadingScreen';
import Navbar from './Nav/Navbar';

export default function Layout({ children }) {
    const { cart, auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [isOpenShoppingCart, setIsOpenShoppingCart] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        router.beforePopState(({ url, as, options }) => {
            if (as == '/profile' && !(auth.user.id && user)) {
                window.location.href = as;
                return false;
            }

            return true;
        });
    }, []);

    useEffect(() => {
        const fetchGlobalData = async () => {
            if (!auth.user.id) {
                const user = JSON.parse(localStorage.getItem('user')) ?? null;
                if (user) {
                    dispatch(loginSuccessful(user));
                }
            }

            if (!cart || !cart.sessionId) {
                const cart = JSON.parse(localStorage.getItem('cart'));

                if (!cart) {
                    dispatch(fetchCart());
                }
            }
        };

        fetchGlobalData();
    }, []);

    const openShoppingCart = (open = true) => {
        setIsOpenShoppingCart(open);
    };

    if (cart.loading || !cart) {
        return <LoadingScreen isLoading={cart.loading} />;
    }

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="description" content="lorem ipsum" />
                    <meta name="og:title" content="Store client" />
                </Head>
                <header>
                    <Navbar handleShoppingCart={openShoppingCart} />
                </header>
                <ToastContainer />
                <ShoppingCart
                    open={isOpenShoppingCart}
                    handleShoppingCart={openShoppingCart}
                />
                <main>{children}</main>
            </div>
        </>
    );
}

