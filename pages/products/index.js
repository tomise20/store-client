import { SearchCircleIcon } from '@heroicons/react/outline';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../components/Inputs/Buttons';
import CustomInput from '../../components/Inputs/CustomInput';
import Layout from '../../components/Layout';
import ProductDetails from '../../components/Product/ProductDetails';
import ProductItem from '../../components/Product/ProductItem';
import { showNotification } from '../../libs/helper';
import { addCartItem } from '../../redux/actions';
import * as ProductService from '../../services/ProductService';

export default function Products({ initProducts, page, total }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState(initProducts);
    const [lastPage, setLastPage] = useState(Math.round(total / 10));
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(null);
    const [realTime, setRealTime] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        setProducts(initProducts);
    }, [initProducts]);

    const openDetails = (id) => {
        setSelectedProduct(products.find((product) => product.id == id));
        setOpen(true);
    };

    const addToCart = async (id) => {
        dispatch(addCartItem(id))
            .then(() => {
                setOpen(false);
                showNotification('A termék sikeresen kosárba helyezve!');
            })
            .catch((err) => showNotification(err));
    };

    const closeModal = () => {
        setOpen(false);
    };

    const handleChange = ({ target: { value } }) => {
        setSearch(value);
        realTime && search && search.length > 0 && onSearch();
    };

    const onSearch = () => {
        if (search && search.length > 0) {
            ProductService.search(search).then((resp) => {
                setProducts(resp.products);
                setLastPage(Math.ceil(resp.total / 10));
                router.push('/products', undefined, { shallow: true });
            });
        }
    };

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-5">
                    Termékeink
                </h2>

                <div>
                    <div className="text-lg mb-2">Kereső</div>
                    <div className="flex flex-col md:flex-row items-start">
                        <div className="grow mr-3">
                            <CustomInput
                                name="search"
                                onChange={handleChange}
                                extraClasses="grow"
                            />
                            <div className="flex items-center my-2">
                                <input
                                    id="realTime"
                                    name="realTime"
                                    type="checkbox"
                                    onChange={() => setRealTime(!realTime)}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
                                />
                                <label htmlFor="realTime">
                                    Keresés valós időben
                                </label>
                            </div>
                        </div>
                        <CustomButton classes="w-auto" handler={onSearch}>
                            <SearchCircleIcon className="w-5 h-5 mr-3" />
                            Keresés
                        </CustomButton>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            openDetails={openDetails}
                        />
                    ))}
                </div>
                <div className="navigation flex flex-col sm:flex-row justify-between mt-8">
                    <CustomButton
                        disabled={page <= 1}
                        handler={() =>
                            router.push(`/products?page=${+page - 1}`)
                        }>
                        <ArrowLeftIcon className="w-5 h-5 mr-3 text-white" />
                        Előző oldal
                    </CustomButton>
                    <CustomButton
                        disabled={page >= lastPage}
                        handler={() =>
                            router.push(`/products?page=${+page + 1}`)
                        }>
                        Következő oldal
                        <ArrowRightIcon className="w-5 h-5 text-white ml-3" />
                    </CustomButton>
                </div>
            </div>

            {selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    open={open}
                    close={closeModal}
                    addToCart={addToCart}
                />
            )}
        </div>
    );
}

Products.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export async function getServerSideProps({ query: { page = 1 } }) {
    const resp = await ProductService.list(page);

    return {
        props: {
            initProducts: resp.products,
            total: resp.total,
            page: +page,
        },
    };
}

