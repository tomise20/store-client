import Image from 'next/image';
import { classNames, currencyFormat } from '../../libs/helper';

export default function ProductItem({ product, openDetails }) {
    return (
        <div
            key={product.id}
            className="group relative hover:cursor-pointer"
            onClick={() => openDetails(product.id)}>
            <div className="relative w-full h-32 min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80">
                <Image
                    width={200}
                    height={500}
                    src={product.image}
                    alt={product.name}
                    objectFit="cover"
                    objectPosition="center"
                    layout="fill"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                        <span
                            className={classNames(
                                product.stock > 0
                                    ? 'text-green-600'
                                    : 'text-red-600',
                                'uppercase text-sm block'
                            )}>
                            {product.stock > 0 ? 'Elérhető' : 'Elfogyott'}
                        </span>
                    </h3>
                </div>
                {product.sale_price ? (
                    <div>
                        <p className="text-sm font-medium text-gray-300 line-through">
                            {currencyFormat(product.price)}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                            {currencyFormat(product.sale_price)}
                        </p>
                    </div>
                ) : (
                    <p className="text-sm font-medium text-gray-900">
                        {currencyFormat(product.price)}
                    </p>
                )}
            </div>
        </div>
    );
}

