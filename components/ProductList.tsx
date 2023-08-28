import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export interface Product {
  url: string;
  id: number;
  name: string;
  description: string;
  category: string;
  site: string;
}

interface ProductListProps {
  products: Product[];
  searchText: string;
}

export function ProductList({ products, searchText }: ProductListProps) {
  return (
    <ul className="my-auto mt-5 text-foreground flex flex-wrap justify-center gap-4">
      {products?.map((product) => (
        product.category.includes(searchText) && (
          <Card key={product.id}>
            <CardHeader className='flex-row justify-between items-center'>
              <CardTitle>{product.name}</CardTitle>
              <Image src={product.url} width={100} height={100} alt='product logo'/>
            </CardHeader>
            <CardContent>
              <p>{product.description}</p>
            </CardContent>
            <CardFooter><Link href={product.site}>Check it out!</Link></CardFooter>
          </Card>
        )
      ))}
    </ul>
  );
}
