import React from 'react';
import axios from 'axios';

const IndexScreen = ({ currentUser }) => {
  console.log(currentUser, 'curreasdasdntUser');
  return <div className='white-color'>Index Page</div>;
};

// getInitialProps is a special method that called when the server serve our html page. Therefor, this function will be executed ON the server.
// In this way, we can fetch data during the server side proccess (Absolute First Request).
// NOTICE: This function runs inside the container/pod. Therefor, we can't just send request just like we are in the broswer.
// To send http directly to ingress-nginx (Beacuse practicly, we are inside a pod!) we need to follow this:
// kubectl get namespace                    => Track the ingress-ngnix namespace.
// kubectl get services -n ingress-nginx    => Track the specific service of ingress-nginx
// http://NAMEOFSERVICE.NAMESPACE.srv.cluster.local
// http://ingress-nginx-controller.ingress-nginx.svc.cluster.local

IndexScreen.getInitialProps = async ({ req }) => {
  // If will execute ON the server
  // console.log(req.headers.cookie);
  if (typeof window === 'undefined') {
    try {
      const { data } = await axios.get(
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
        {
          headers: {
            Host: 'ticketing.dev',
          },
        }
      );
      console.log(data, '!??!');
      return data;
    } catch (error) {
      console.log(error.response.data.errors[0].message);
      const test = error.response.data.errors[0].message;
      return test;
    }
    // Else will execute ON the client (after re-navigate! remember? the first execute (if) will run inside the server)
  } else {
    console.log('??');
    const { data } = await axios.get('/api/users/currentuser');
    console.log(data, 'what?');
    return data;
  }
};

export default IndexScreen;
