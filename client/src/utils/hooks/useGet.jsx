import { useState, useEffect } from "react";
import axios from "axios";

const useGet = (api, datum) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(api);
      const fetchedData = await res.data[datum];
      setData(fetchedData);
    };
    fetchData();
  }, [api, datum]);

  return data;
};

export default useGet;
