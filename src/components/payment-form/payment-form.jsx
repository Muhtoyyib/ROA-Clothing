import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart-selector";
import { seletCurrentUser } from "../../store/user/user-selector";


import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

import Button from "../button/button";

export default function PaymentForm(){
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(seletCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)


    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setIsProcessingPayment(true)

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100  }),
        }).then(res => res.json()) 

        console.log(response);

        const clientSecret = response.paymentIntent.client_secret;

        console.log(clientSecret);

        const paymentResult = await stripe.confirmCardPayment( clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'guest',
                }
            }
        })

        setIsProcessingPayment(false);


        if(paymentResult.error){
            alert(paymentResult.error);
            console.log(paymentResult.error);
            console.log(paymentResult.paymentIntent.status);
        } else {
            if(paymentResult.paymentIntent.status == 'succeeded'){
                alert('payment successful');
                console.log(paymentResult.paymentIntent.status);
            }
        }
    };

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit or Debit Card: </h2>
                <CardElement />
                <Button disabled={isProcessingPayment} buttonText={`Pay now`} buttonType={`inverted`} /> 
                <p>
                    <small>
                        By clicking &quot;Pay Now&quot;, you agree to our Terms and Conditions and Privacy Policy.
                    </small>
                </p> 
            </FormContainer>
        </PaymentFormContainer>
    )
}
