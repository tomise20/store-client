import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { currencyFormat } from '../../libs/helper';
import { removeCartItem } from '../../redux/types';
import { removeItem } from '../../services/CartService';

export default function CartItem({ item, isOrder = false }) {
    const dispatch = useDispatch();

    const remove = async (id) => {
        removeItem(id)
            .then(dispatch(removeCartItem(id)))
            .catch((err) => console.log(err));
    };

    return (
        <li className="flex justify-center items-start flex-row py-2">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md text-center mx-auto">
                <Image
                    width={70}
                    height={70}
                    src={item.image}
                    alt={item.name}
                    objectFit="contain"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex flex-col justify-between text-base font-medium text-gray-900">
                        <div className="text-lg">{item.name}</div>
                        <div className="flex flex-col md:flex-row justify-between mb-3">
                            <div className="flex font-thin text-md">
                                <p>{currencyFormat(item.price)}</p>
                                <span className="mx-1">-</span>
                                <p>{item.quantity} db</p>
                            </div>
                            <p>{currencyFormat(item.price * item.quantity)}</p>
                        </div>
                        <div className="flex flex-wrap justify-between text-sm text-gray-400 font-normal mb-3">
                            <span className="pr-3">
                                {item.meal && <span>{item.meal}</span>}
                            </span>
                        </div>
                    </div>
                </div>
                {!isOrder && (
                    <div className="flex flex-1 items-end justify-end text-sm">
                        <button
                            type="button"
                            className="font-medium uppercase text-red-600 hover:text-red-800"
                            onClick={() => remove(item.id)}>
                            Törlés
                        </button>
                    </div>
                )}
            </div>
        </li>
    );
}

