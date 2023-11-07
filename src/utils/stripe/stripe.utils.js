import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
    "pk_test_51O7RXbSHWkYfhcFtHlfnlp8dR1Rsy8sd8PIU3bgpodUGptd1KdXP3NP8a4knXdOW1va0YTYCTx2UZBsINbNoHyxM00BocLBPDM"
)