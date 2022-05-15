export default function CustomInput({ extraClasses, ...otherProperties }) {
    return (
        <input
            {...otherProperties}
            className={`appearance-none relative w-full block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${extraClasses}`}
        />
    );
}

