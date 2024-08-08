import connectDB from "@/connectToDB";
import Product from "@/lib/model/product.model";
import { scrapedAmazonProduct } from "@/lib/scraper";

export async function GET() {
    try {
        connectDB();
        const products = await Product.find();
        if (!products) {
            throw new Error("No products found");
        }

        // 1. scrape all the produts in the DB and find the latest details about them
        const updatedProduct = await Promise.all(
            products.map(async(currentProduct)=>{
                const scrapedProduct =  await scrapedAmazonProduct(currentProduct.url)
                if(!scrapedProduct) throw new Error("No scaped product found");

                const updatedPriceHistory = [...existingProduct.pricesHistory, { price: scrapedProduct.priceHistory }];
            })
        )
    }
    catch (e) {

    }
}