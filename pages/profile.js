import { useEffect, useState } from 'react';
import OrderItem from '../components/Cart/OrderItem';
import Layout from '../components/Layout';
import LoadingScreen from '../components/LoadingScreen';
import { showNotification } from '../libs/helper';
import * as OrderService from '../services/OrderService';

export default function Profile() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            await OrderService.findAllForUser()
                .then((orders) => {
                    setOrders(orders);
                })
                .catch((error) => setError(error));
        };

        fetchOrders();
    }, []);

    const removeOrder = (id) => {
        OrderService.remove(id)
            .then(() => {
                setOrders(orders.filter((order) => order.id !== id));
                showNotification('Rendelés sikeresen törölve!');
            })
            .catch((error) => showNotification(error));
    };

    if (!orders) {
        return <LoadingScreen isLoading={!!orders} />;
    }

    if (error) {
        return <div>{error}</div>;
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

