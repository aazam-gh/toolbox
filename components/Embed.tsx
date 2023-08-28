import { NextApiRequest, NextApiResponse } from 'next'
import { pipeline } from '@xenova/transformers'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBIC_SUPABASE_ANON_KEY!,
)



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get all rows from the product table
  const { data: products, error } = await supabase.from('products').select('*')

  if (error) {
    // Handle the error
    res.status(500).json({ error: 'An error occurred while fetching data.' })
    return
  }

  if (products === null) {
    // Handle the case where products is null
    res.status(404).json({ error: 'No products found.' })
    return
  }
  
  // Loop over each row and generate an embedding
  for (const product of products) {
    const generateEmbedding = await pipeline('feature-extraction', 'Supabase/gte-small')
    const output = await generateEmbedding(product.description, {
      pooling: 'mean',
      normalize: true,
    })

    // Extract the embedding output
    const embedding = Array.from(output.data)

    // Store the vector in the product_document table
    const { data, error } = await supabase.from('product_documents').insert({
      product_id: product.id,
      embedding,
    })
  }

  res.status(200).json({ message: 'Embeddings generated successfully.' })
}
