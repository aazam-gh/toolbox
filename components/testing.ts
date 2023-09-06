import { CohereEmbeddings } from "langchain/embeddings/cohere";
import { createClient } from "@supabase/supabase-js";


const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseURL, supabaseKEY);
const embeddings = new CohereEmbeddings({
    apiKey: process.env.COHERE_API_KEY, // In Node.js defaults to process.env.COHERE_API_KEY
    batchSize: 48 // Default value if omitted is 48. Max value is 96
});

export default async function getData() {

    const { data: products } = await supabase.from('products').select('id, description, embeddings')
    products?.map(async (product) => {
        const embed = await embeddings.embedQuery(product.description);
        const data = await supabase.from('products').update({'embeddings': embed}).eq('id', product.id)
    })
}