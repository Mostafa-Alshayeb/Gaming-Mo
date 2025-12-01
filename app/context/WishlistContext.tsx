"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGetUser } from "@/lib/QueryFunctions";
import Spinner from "../components/defaults/Spinner";
import { toast } from "react-toastify";
import { addToWishList, removeFromWishList } from "../actions/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface WishListProps {
  handleAddToWishlist: (gameId: string) => void;
  wishlist: string[];
}
const wishlistContext = createContext<WishListProps | null>(null);
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [mount, setIsMounted] = useState(false);
  const { user, isLoading } = useGetUser();

  const [wishlistLocal, setWishListLocal] = useLocalStorageState<string[]>(
    "wishlist",
    user?.data ? [...user?.data.wishlist] : []
  );
  console.log(user);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const queryClient = useQueryClient();
  const wishlist = user?.data ? user.data.wishlist : wishlistLocal;
  const handleAddToWishlist = async (gameId: string) => {
    if (!mount) return null;
    const isInWishList = wishlist.some(
      (wish: any) => wish.toString() === gameId
    );
    if (user?.data) {
      const res = isInWishList
        ? await removeFromWishList(gameId)
        : await addToWishList(gameId);
      if (res.success) {
        toast.success(res.success);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } else toast.error(res.error);
    } else {
      if (isInWishList) {
        setWishListLocal((prev) => prev.filter((wish) => wish !== gameId));
      } else {
        setWishListLocal((prev) => [...prev, gameId]);
      }
    }
  };
  if (!mount) return null;
  if (isLoading) return <Spinner />;
  return (
    <wishlistContext.Provider value={{ handleAddToWishlist, wishlist }}>
      {children}
    </wishlistContext.Provider>
  );
};
export const useWishlsit = () => {
  const context = useContext(wishlistContext);
  if (!context) {
    throw new Error("useWishlsit must be used within a WishlistProvider");
  }
  return context;
};
