'use client'
import { useState, useEffect } from 'react'; // Import useEffect
import {
    createClientComponentClient,
  } from "@supabase/auth-helpers-nextjs";
  import { Input } from "@/components/ui/input";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
  } from "@/components/ui/card";

  interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
  }
  
  export default function Page() {
    const supabase = createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    });
  
    const [products, setProducts] = useState<Product[]>([]); // State for products
    const [searchText, setSearchText] = useState<string>('');
  
    useEffect(() => {
      // Fetch products using Supabase
      async function fetchProducts() {
        const { data } = await supabase.from('products').select();
        setProducts(data || []);
      }
  
      fetchProducts(); // Call the fetchProducts function
  
    }, []); // Empty dependency array ensures the effect runs only once, like componentDidMount
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    };
  
    return (
      <>
        <div>
          <Input
            type="text"
            placeholder="Search for a Product"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <ul className="my-auto mt-5 text-foreground flex flex-wrap justify-center gap-4">
          {products?.map((product) => (
            product.category.includes(searchText) && (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                </CardContent>
                <CardFooter>{product.category}</CardFooter>
              </Card>
            )
          ))}
        </ul>
      </>
    );
  }
  