import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Task from "@/interfaces/Task";

interface FetchDataResponse {
  tasks: Task[];
  map: any;
  length: any;
}

const useFetchData = (endpoint: string): FetchDataResponse | null => {
  const [data, setData] = useState<FetchDataResponse | null>(null);
  // const baseUrl = process.env.MONGODB_URL;
  const baseUrl = process.env.MONGODB_URL;
  const cookies = new Cookies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = cookies.get("token");
        const response = await axios.get(baseUrl + endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [endpoint]);

  return data;
};

export default useFetchData;
