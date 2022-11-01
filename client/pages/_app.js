import '../styles/styles.css';
import Head from 'next/head';
import ApplicationLayout from '../components/ApplicationLayout/ApplicationLayout';

export default ({ Component, pageProps }) => {
  return (
    <ApplicationLayout>
      <Head>
        <title>Microservices</title>
      </Head>
      <Component {...pageProps} />
    </ApplicationLayout>
  );
};
