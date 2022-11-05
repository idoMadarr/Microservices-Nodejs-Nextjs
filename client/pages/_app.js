import Head from 'next/head';
import ApplicationLayout from '../components/ApplicationLayout/ApplicationLayout';
import axiosClient from '../utils/axiosClient';
import '../styles/styles.css';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <ApplicationLayout currentUser={currentUser}>
      <Head>
        <title>Microservices</title>
      </Head>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Quicksand&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <Component {...pageProps} currentUser={currentUser} />
    </ApplicationLayout>
  );
};

// getInitialProps inside _app root component will disable all other getInitialProps over the app by default
// to allow others getInitialProps functions, we need to check ahead if a component hold getInitialProps function.
AppComponent.getInitialProps = async context => {
  const { data } = await axiosClient(context.ctx).get('/api/users/currentuser');

  let pageProps = {};
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx);
  }

  return { pageProps, currentUser: data.currentUser };
};

export default AppComponent;
