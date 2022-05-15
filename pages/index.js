import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline';
import Layout from '../components/Layout';
import ProductPromotion from '../components/ProductPromotion';

const features = [
    {
        name: 'Competitive exchange rates',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: GlobeAltIcon,
    },
    {
        name: 'No hidden fees',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: ScaleIcon,
    },
    {
        name: 'Transfers are instant',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: LightningBoltIcon,
    },
    {
        name: 'Mobile notifications',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        icon: AnnotationIcon,
    },
];

export default function Home() {
    return (
        <div>
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                            Transactions
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            A better way to send money
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate
                            veritatis in accusamus quisquam.
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white">
                                            <feature.icon className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                            {feature.name}
                                        </p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block text-indigo-600">Start your free trial today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <a
                                href="#"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700">
                                Get started
                            </a>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <a
                                href="#"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-sky-50">
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <ProductPromotion />
        </div>
    );
}

Home.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

