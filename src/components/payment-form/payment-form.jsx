import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

import Button from "../button/button";

export default function PaymentForm(){
    const stripe = useStripe();
    const elements = useElements();

    // eslint-disable-next-line no-unused-vars
    // const cardElementOptions = {
    //     style: {
    //         base: {
    //             fontSize: '16px',
    //             color: '#424770',
    //             letterSpacing: '0.025em',
    //             fontFamily: 'Source Code Pro, monospace',
    //             '::placeholder': {
    //                 color: '#aab7c4',
    //             },
    //         },
    //         invalid: {
    //             color: '#9e2146',
    //         },
    //     },
    // };

    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: 10000}),
        }).then(res => res.json()) 

        console.log(response);

        const clientSecret = response.paymentIntent.client_secret;

        console.log(clientSecret);

        const paymentResult = await stripe.confirmCardPayment( clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Akande Olalekan'
                }
            }
        })

        console.log(paymentResult);
        console.log(paymentResult.error);

        if(paymentResult.error){
            alert(paymentResult.error)
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('payment successful')
            }
        }
    };

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit or Debit Card: </h2>
                <CardElement />
                <Button buttonText={`Pay now`} buttonType={`inverted`} /> 
                <p>
                    <small>
                        By clicking &quot;Pay Now&quot;, you agree to our Terms and Conditions and Privacy Policy.
                    </small>
                </p> 
            </FormContainer>
        </PaymentFormContainer>
    )
}