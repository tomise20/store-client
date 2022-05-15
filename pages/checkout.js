import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/Cart/CartItem';
import { CustomButton } from '../components/Inputs/Buttons';
import CustomInput from '../components/Inputs/CustomInput';
import { currencyFormat, showNotification } from '../libs/helper';
import { orderRequest } from '../redux/actions';

export default function Checkout() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { cart, auth } = useSelector((state) => state);
    const [data, setData] = useState({
        user_id: null,
        name: '',
        email: '',
        address: '',
    });

    useEffect(() => {
        if (auth.user.id) {
            setData({
                user_id: auth.user.id,
                name: auth.user.name,
                email: auth.user.email,
                address: auth.user.address,
            });
        }
    }, [auth.user]);

    const handleChange = ({ target }) =>
        setData({ ...data, [target.name]: target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(orderRequest(data))
            .then((order) => {
                setData({
                    name: '',
                    email: '',
                    address: '',
                });
                showNotification('Sikeres rendelés leadás!');
                setTimeout(() => {
                    router.push(`/thank-you/${order.id}`);
                }, 1500);
            })
            .catch((error) => {
                showNotification(error.message, 'error');
            });
    };

    return (
        <>
            <div className="container xl:max-w-7xl my-10">
                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-12 md:gap-6 p-3 lg:p-0">
                        <div className="col-span-12 lg:col-span-7 mb-5 lg:md-0">
                            <h3 className="text-lg font-medium leading-6 mb-5 text-gray-900">
                                Számlázási informáicó
                            </h3>
                            <div className="grid grid-cols-12 md:gap-5 gap-3">
                                <div className="col-span-12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2">
                                        E-mail cím
                                    </label>
                                    <CustomInput
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                        extraClasses="rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2">
                                        Név
                                    </label>
                                    <CustomInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        required
                                        extraClasses="rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-medium text-gray-700 mb-2">
                                        Cím
                                    </label>
                                    <CustomInput
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        onChange={handleChange}
                                        required
                                        extraClasses="rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-5">
                            <h3 className="text-lg font-medium leading-6 mb-5 text-gray-900">
                                Rendelés összesítés
                            </h3>
                            <div className="shadow-xl border-2 border-gray-200">
                                <div className="my-5 p-3 md:p-5 h-auto">
                                    <div className="flow-root">
                                        <ul
                                            role="list"
                                            className="-my-6 divide-y divide-gray-200">
                                            {cart.items.length > 0 &&
                                                cart.items.map((product) => (
                                                    <CartItem
                                                        key={product.id}
                                                        item={product}
                                                    />
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="p-3 pt-0 md:p-5 md:pt-0">
                                    <div className="flex flex-col">
                                        <div className="flex justify-between pt-5 border-t border-gray-200 text-black font-bold">
                                            <span>Összesen</span>
                                            <span>
                                                {currencyFormat(
                                                    cart.total_price
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t-2 border-gray-200 p-3 md:p-5">
                                    <CustomButton
                                        isSubmit={true}
                                        extraClasses="py-5">
                                        Rendelés Leadás
                                    </CustomButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

