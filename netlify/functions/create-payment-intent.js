// eslint-disable-next-line no-undef
require("dotenv").config();
// eslint-disable-next-line no-undef
const stripe = require("stripe")('sk_test_51O7RXbSHWkYfhcFtUmp9YWqzjbEUfuuE9OMbjRajsR6vireYb9XWQn2Y04LQ29xdMxtUqGFbmirYxx0zGE0ZC9FL00OhWY7c7T');

// eslint-disable-next-line no-undef
exports.handler = async (event) => {
    try{ 
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent })
        }
    } catch(error){
        console.log({error});

        return {
            statusCode: 400,
            body: JSON.stringify({ error })
        }
    }
}