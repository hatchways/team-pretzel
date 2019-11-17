import { useState, useEffect } from "react";
import axios from "axios";

const useGet = (api, datum) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(api);
      const fetchedData = await res.data[datum];
      console.log(fetchedData);
      await setData(fetchedData);
    };
    fetchData();
  }, []);

  return data;
};

export default useGet;
