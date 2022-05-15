import { currencyFormat } from '../../libs/helper';

export default function OrderItem({ order, remove }) {
    return (
        <div className="flex flex-1 flex-row items-center border-b border-gray-300 py-3">
            <div>
                <div className="flex flex-col justify-between text-base font-medium text-gray-900">
                    <div className="text-lg">{order.name}</div>
                    <p className="mb-2 text-indigo-600">{order.address}</p>
                    <div className="flex flex-col md:flex-row justify-between mb-3">
                        <div className="flex font-thin text-md">
                            <p>{currencyFormat(order.totalPrice)}</p>
                            <p>{order.itemsCount} db</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 items-end justify-end text-sm">
                <button
                    type="button"
                    className="font-medium uppercase text-red-600 hover:text-red-800"
                    onClick={() => remove(order.id)}>
                    Törlés
                </button>
            </div>
        </div>
    );
}

