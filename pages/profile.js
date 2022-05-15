import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OrderItem from '../components/Cart/OrderItem';
import Layout from '../components/Layout';
import LoadingScreen from '../components/LoadingScreen';
import { showNotification } from '../libs/helper';
import * as OrderService from '../services/OrderService';

export default function Profile() {
    const [orders, setOrders] = useState([]);
    const router = useRouter();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!auth.user.id && !user) {
            router.push('/');
        }
    }, []);

    useEffect(() => {
        OrderService.findAllForUser().then((orders) => {
            setOrders(orders);
        });
    }, []);

    const removeOrder = (id) => {
        OrderService.remove(id)
            .then(() => {
                setOrders(orders.filter((order) => order.id !== id));
                showNotification('Rendelés sikeresen törölve!');
            })
            .catch((err) => showNotification('Hiba!'));
    };

    if (!orders) {
        <LoadingScreen isLoading={true} />;
    }

    return (
        <div className="container xl:max-w-7xl p-5">
            <h2 className="text-2xl mb-5 text-center">Profil</h2>

            {orders.length == 0 && (
                <div className="text-xl text-center">
                    Még nincsen rendelésed!
                </div>
            )}

            <div className="flex flex-col">
                {orders.length > 0 &&
                    orders.map((order) => (
                        <OrderItem
                            key={order.id}
                            order={order}
                            remove={removeOrder}
                        />
                    ))}
            </div>
        </div>
    );
}

Profile.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

