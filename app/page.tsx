import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'


export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data } = await supabase.from('products').select();




  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <h1 className='text-3xl'>toolbox</h1>
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2 px-4 text-xl rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <ul className="my-auto mt-5 text-foreground flex flex-wrap justify-center gap-4">
        {data?.map((product) => (
          <Card key={product.id} className='w-2/5'>
            <Link href={product.site}>
              <CardHeader className='flex flex-row justify-between items-center'>
                <CardTitle>{product.name}</CardTitle>
                <Image src={product.url} width={100} height={100} alt='product logo' />
              </CardHeader>
              <CardContent>
                <p>{product.description}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </ul>


    </div>
  )
}
