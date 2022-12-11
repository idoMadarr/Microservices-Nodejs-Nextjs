import { useEffect, useState } from 'react';
import axiosClient from '../../utils/axiosClient';

const CreateOrder = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const clacTime = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    const timer = setInterval(clacTime, 1000);

    return () => clearInterval(timer);
  }, [order]);

  console.log(order.expiresAt);
  //   console.log(new Date());
  //   console.log(new Date() - new Date(order.expiresAt));
  //   console.log(order.expiresAt - new Date());

  return <div>{<p>{timeLeft} Seconds until order expires</p>}</div>;
};

export default CreateOrder;

CreateOrder.getInitialProps = async context => {
  const { orderId } = context.query;

  const { data } = await axiosClient(context).get(`/api/orders/${orderId}`);

  return { order: data };
};
