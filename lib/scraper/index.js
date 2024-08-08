import axios from 'axios'
import * as cheerio from "cheerio"

export async function scrapedAmazonProduct(url) {
    // const extractPrice = (...elements) => {
    //     for (const el of elements) {
    //         const priceText = el.text().trim();
    //         if (priceText) {
    //             return priceText.replace(/[^\d]/g, "");
    //         }
    //         return "";
    //     }
    // }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //> hello these extract the important detais from the product page                                                                            
    function extractPrice(...elements) {
        for (const element of elements) {
            const priceText = element.text().trim();

            if (priceText) {
                const cleanPrice = priceText.replace(/[^\d.]/g, '');

                let firstPrice;

                if (cleanPrice) {
                    firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
                }

                return firstPrice || cleanPrice;
            }
        }

        return '';
    }



    function extractDescription($) {
        // these are possible elements holding description of the product
        const selectors = [
            ".a-unordered-list .a-list-item",
            ".a-expander-content p",
            // Add more selectors here if needed
        ];

        for (const selector of selectors) {
            const elements = $(selector);
            if (elements.length > 0) {
                const textContent = elements
                    .map((_, element) => $(element).text().trim())
                    .get()
                    .join("\n");
                return textContent;
            }
        }

        // If no matching elements were found, return an empty string
        return "";
    }


    function getHighestPrice(priceList) {
        let highestPrice = priceList[0];

        for (let i = 0; i < priceList.length; i++) {
            if (priceList[i].price > highestPrice.price) {
                highestPrice = priceList[i];
            }
        }

        return highestPrice.price;
    }

    function getLowestPrice(priceList) {
        let lowestPrice = priceList[0];

        for (let i = 0; i < priceList.length; i++) {
            if (priceList[i].price < lowestPrice.price) {
                lowestPrice = priceList[i];
            }
        }

        return lowestPrice.price;
    }

    function getAveragePrice(priceList) {
        const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
        const averagePrice = sumOfPrices / priceList.length || 0;

        return averagePrice;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (!url) return;
    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_014d3f61-zone-pricehub:3jjjl8tg55f4 -k "https://geo.brdtest.com/mygeo.json"
    const username = String(process.env.BRIGHTDATAUSERNAME)
    const password = String(process.env.BRIGHTDATAPASSWORD)
    const port = 22225;
    const sessionId = (1000000 * Math.random()) | 0;
    const options = {
        auth: {
            username: `${username}-session-${sessionId}`,
            password
        },
        host: `brd.superproxy.io`,
        port,
        rejectUnauthorized: false
    }
    try {
        const response = await axios.get(url, options)
        const $ = cheerio.load(response.data)
        const title = $("#productTitle").text().trim()
        const currentPrice = extractPrice(
            $(".priceToPay span.a-price-whole"),
            $('a.size.base.a-color-price'),
            $(".a-button-selected .a-color-base"),
        )

        const originalPrice = extractPrice(
            $(".a-price.a-text-price span.a-offscreen"),
            $("#priceblock_ourprice"),
            $(".a-price.a-text-price span.a-offscreen"),
            $("#listPrice"),
            $("#priceblock_dealprice"),
            $(".a-size-base.a-color-price")
        )

        const outOfStock = $("#availability span").text().trim().toLowerCase() === "currently unavailable";
        const images = $("#imgBlkFront").attr("data-a-dynamic-image") || $("#landingImage").attr("data-a-dynamic-image") || "{}"
        const imageURLs = Object.keys(JSON.parse(images));
        const currency = $(".a-price-symbol").text().trim().slice(0, 1) ? $(".a-price-symbol").text().trim().slice(0, 1) : "";
        const discountRate = $(".savingsPercentage").text().trim().replace(/[-%]/g, "")
        const description = extractDescription($);
        const data = {
            url,
            currency: currency || '$',
            image: imageURLs[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: "category",
            reviewsCount: 0,
            stars: 0.0,
            isOutOfStock: outOfStock,
            description: description,
            lowestPrice: Number(originalPrice) || Number(currentPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(originalPrice) || Number(currentPrice),
        }

        console.log(data)
        return data;
        // console.log(response.data)


    } catch (error) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}