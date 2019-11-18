import { useState, useEffect } from "react";
import axios from "axios";

const useGet = (api, datum) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("jwtToken");
      const res = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const fetchedData = await res.data[datum];
      setData(fetchedData);
    };
    fetchData();
  }, [api, datum]);

  return data;
};

export default useGet;
