import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useStore } from '../redux';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const getLayout = Component.getLayout || ((page) => page);
    const store = useStore(pageProps.initialReduxState);

    useEffect(() => {
        const handleRouteChangeError = (err, url) => {
            if (err.cancelled) {
                console.log(`Route to ${url} was cancelled!`);
            }
        };

        router.events.on('routeChangeError', handleRouteChangeError);

        return () => {
            router.events.off('routeChangeError', handleRouteChangeError);
        };
    }, []);

    return (
        <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
        </Provider>
    );
}

