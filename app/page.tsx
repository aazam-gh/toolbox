'use client'
import { useState, useEffect } from 'react';
import {
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { ProductList, Product } from "@/components/ProductList";
import { SearchBar } from "@/components/SearchBar";
import AuthForm from './AuthForm';

export default function Page() {
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select();
      setProducts(data || []);
    }

    fetchProducts();
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <>
      <div className='mt-5 flex flex-col items-center justify-center'>

        <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
        <div className='w-1/2'>
          <AuthForm />
        </div>
      </div>
      <ProductList products={products} searchText={searchText} />
    </>
  );
}
