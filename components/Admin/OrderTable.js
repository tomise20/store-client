import { TrashIcon } from '@heroicons/react/outline';
import { currencyFormat } from '../../libs/helper';
import { CustomButton } from '../Inputs/Buttons';

export default function OrderTable({ orders, remove }) {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Név
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Dátum
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Termékek száma
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Összeg (HUF)
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Törlés
                    </th>
                </tr>
            </thead>
            <tbody>
                {orders.length == 0 && (
                    <tr>
                        <td colSpan={4} className="text-center py-5">
                            Még nincsennek rendelések
                        </td>
                    </tr>
                )}
                {orders.length > 0 &&
                    orders.map((order) => (
                        <tr
                            key={order.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {order.name}
                            </th>
                            <td className="px-6 py-4">{order.createdAt}</td>
                            <td className="px-6 py-4">
                                {order.items.length} db
                            </td>
                            <td className="px-6 py-4">
                                {currencyFormat(order.totalPrice)}
                            </td>
                            <td className="px-6 py-4">
                                <CustomButton
                                    handler={() => remove(order.id)}
                                    classes="bg-red-600 hover:bg-red-800">
                                    <TrashIcon className="w-5 h-5 text-white mr-3" />
                                    Törlés
                                </CustomButton>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

