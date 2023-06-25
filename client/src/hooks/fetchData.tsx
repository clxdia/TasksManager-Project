import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

interface Task {
  id: string;
  title: string;
  desc: string;
  due_date: number;
  priority: string;
  tags: string[];
  name: string;
  username: string;
  author: string;
}

interface FetchDataResponse {
  tasks: Task[];
  map: any;
}

const useFetchData = (endpoint: string): FetchDataResponse | null => {
  const [data, setData] = useState<FetchDataResponse | null>(null);
  const baseUrl = "http://localhost:3005/" || process.env.MONGODB_URL;
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
