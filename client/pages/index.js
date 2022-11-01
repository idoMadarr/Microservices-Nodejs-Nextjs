import React from 'react';
import axios from 'axios';

const IndexScreen = ({}) => {
  return <div className='white-color'>Index Page</div>;
};

// getInitialProps is a special method that called when the server serve our html page. Therefor, this function will be executed on the server.
// In this way, we can fetch data during the server side proccess.
// NOTICE: This function runs inside the container/pod
IndexScreen.getInitialProps = async () => {
  // const response = await axios.get('api/users/currentuser').catch(err => {
  //   console.log(err);
  // });
  // return response.data;
  return {};
};

export default IndexScreen;
