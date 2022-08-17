import { useState, useEffect } from 'react';
import axios from 'axios'

axios.defaults.baseURL = 'https://react-app-food-order-default-rtdb.firebaseio.com/';

const useAxios = (params, applayData, sendCall = true) => {
  // const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    try {
      // console.log('params', params);
      const res = await axios.request(params);
      applayData(res.data)
    } catch (err) {
      alert("error")
      console.log("some error occured", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sendCall) fetchData(params);
  }, [sendCall]);

  return { error, loading };
};

export default useAxios;
