import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useState } from "react";
import useOnlineStatus from "../../Hooks/useOnlineStatus";
import useProducts from "../../Hooks/useProducts";

export default function Products() {
  const isOnline = useOnlineStatus();
  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <Loading />;

  if (isError) return <h2>ERROR</h2>;

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
