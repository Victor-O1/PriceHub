"use server"

import { revalidatePath } from "next/cache";
import Product from "../model/product.model";
import { scrapedAmazonProduct } from "../scraper";
import connectDB from "@/connectToDB";
import { generateEmailBody, sendEmail } from "../nodemailer";
export async function scrapeAndStoreProduct(url) {
    if (!url) return;
    try {
        connectDB();
        const scrapedProduct = await scrapedAmazonProduct(url);
        if (!scrapedProduct) return;
        let product = scrapedProduct;

        const existingProduct = await Product.findOne({ url: product.url });

        if (existingProduct) {
            const updatedPriceHistory = [...existingProduct.pricesHistory, { price: scrapedProduct.priceHistory }];
            product = { ...scrapedProduct, pricesHistory: updatedPriceHistory, lowestPrice: getLowestPrice(updatedPriceHistory), highestPrice: getHighestPrice(updatedPriceHistory), averagePrice: getAveragePrice(updatedPriceHistory) };
        }
        const newProduct = await Product.findOneAndUpdate({ url: product.url }, product, { new: true, upsert: true });
        revalidatePath("/products/" + newProduct._id);
    }
    catch (e) {
        throw new Error("Failed to create/update the product: ", e.message);
    }
}

export async function getProductById(id) {
    try {
        connectDB();
        const product = await Product.findOne({ _id: id });
        if (!product) return null;
        return product;
    } catch (e) {
        console.log(e);
    }
}



export async function getAllProducts() {
    try {
        connectDB()
        const products = await Product.find()
        return products
    }
    catch (e) {
        console.log(e)
    }
}

export async function getSimilarProducts(id) {
    try {
        connectDB()
        const currentProduct = await Product.findById(id);
        if (!currentProduct) return null

        const similarProducts = await Product.find({ categories: currentProduct.categories, _id: { $ne: currentProduct._id } })
        return similarProducts
    }
    catch (e) {
        console.log(e)
    }
}


export async function addUserEmailToProduct(id, userEmail) {
    try {
        const product = await Product.findById(id);
        if (!product) return;
        const userExists = product.users.some((user) => user.email === userEmail)
        if (userExists) {
            console.log("THE USER ALREADY EXISTS AND SHOULD ALREADY BE RECIEVING THE NOTIFICATIONS. WHY ADD HIIM/HER AGAIN??")
        }
        if (!userExists) {
            product.users.push({ email: userEmail });
            console.log("STEP 1 COMPLETE")
            await product.save();
            console.log("STEP 2 COMPLETE")

            const emailContent = await generateEmailBody(product, "WELCOME")
            console.log("STEP 3 COMPLETE and the email content is ", emailContent)

            await sendEmail(emailContent, userEmail);
            console.log("STEP 4 COMPLETE")
        }
    }
    catch (e) {

    }
}