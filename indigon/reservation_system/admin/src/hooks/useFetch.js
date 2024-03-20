import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const startFetch = async () => {
      setLoading(true);
      try {
        const request = await axios.get(url, {
          withCredentials: true,
        });
        const response = await request.data;
        setData(response.data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    startFetch();
  }, [url]);

  return { data, loading, error };
};
