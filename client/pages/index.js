import React from 'react';
// import axiosClient from '../utils/axiosClient';

const IndexScreen = ({ currentUser }) => {
  return (
    <div className='white-color'>
      <h3>{currentUser ? 'You are signed in' : 'You are NOT signed in'}</h3>
      {currentUser && <small>{currentUser.email}</small>}
    </div>
  );
};

// getInitialProps is a special method that called when the server serve our html page. Therefor, this function will be executed ON the server.
// In this way, we can fetch data during the server side proccess (Absolute First Request).
// NOTICE: This function runs inside the container/pod. Therefor, we can't just send request just like we are in the broswer.
// To send http directly to ingress-nginx (Beacuse practicly, we are inside a pod!) we need to follow this:
// kubectl get namespace                    => Track the ingress-ngnix namespace.
// kubectl get services -n ingress-nginx    => Track the specific service of ingress-nginx
// http://NAMEOFSERVICE.NAMESPACE.srv.cluster.local
// http://ingress-nginx-controller.ingress-nginx.svc.cluster.local

// IndexScreen.getInitialProps = async context => {
//   const { data } = await axiosClient(context).get('/api/users/currentuser');
//   console.log('???');
//   return data;
// };

export default IndexScreen;
