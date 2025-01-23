import { useState, useEffect } from "react";

export function useFetch(url: string | URL | Request) {

     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     
     useEffect(() => {
       fetch(url)
         .then((response) => response.json())
         .then((json) => setData(json))
         .finally(() => setLoading(false));
  }, []);

 return { data, loading }};