import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  async function getProducts() {
    console.log("####### FETCHING");
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };

    return axios.request(options);
  }

  let response = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnMount: true,
    staleTime: 5000,
    gcTime: 9000,
    refetchOnWindowFocus: false,
    retry: 5,
    retryDelay: 2000,
  });

  return response;
}
