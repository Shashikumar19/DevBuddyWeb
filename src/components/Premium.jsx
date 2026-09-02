import axios from "axios";
import { baseUrl } from '../utils/constants'
import { useEffect, useState } from "react";

const Premium = () => {
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        verifyPayment();
    }, [])

    const handlePayment = async (plan) => {

        try {
            const orderDetails = await axios.post(baseUrl + '/payment/order', { plan }, { withCredentials: true });
            const { keyId, notes, amount, currency, orderId } = orderDetails.data.order;
            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: 'DevBuddy ',
                description: 'connect to your fellow developer friend',
                order_id: orderId,
                // callback_url: 'http://localhost:3000/payment-success', // Your success URL
                prefill: {
                    name: notes.firstName,
                    email: notes.email,
                    plan: notes.plan,
                    contact: '9999999999'
                },
                handler: () => {
                    verifyPayment();
                },
                theme: {
                    color: '#4d4dff'
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open()
        } catch (error) {
            console.log("Error", error)
        }
    }

    const verifyPayment = async () => {
        try {
            const data = await axios.get(baseUrl + "/payment/verify", { withCredentials: true });
            if (data.data.isPremium) {
                setIsPremium(true)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    if (isPremium) return (<div className="flex justify-center mt-5">
        <div role="alert" className="alert alert-warning w-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>you are an premium member</span>
        </div>
    </div>)

    return <div>
        <div className="flex w-full p-10">
            <div className="card bg-base-300 rounded-box grid grow h-50 place-items-center">
                <div className="card bg-base-300 rounded-box grid grow place-items-center gap-2">
                    <h1> Silver Plan </h1>
                    <ul>
                        <li>
                            Amount to be paid ₹ 500 rupeese
                        </li>
                        <li>
                            100 connection request can be sent
                        </li>
                        <li>
                            Buy now to enhance your connections
                        </li>
                    </ul>
                    <button className="btn btn-secondary" onClick={() => handlePayment('silver')}>Buy Silver</button>
                </div>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid grow h-50 place-items-center">
                <div className="card bg-base-300 rounded-box grid grow place-items-center gap-2">
                    <h1> Gold Plan </h1>
                    <ul>
                        <li>
                            Amount to be paid ₹ 700 rupeese
                        </li>
                        <li>
                            infinite connection request can be sent
                        </li>
                        <li>
                            Buy now to enhance your connections
                        </li>
                    </ul>
                    <button className="btn btn-primary" onClick={() => handlePayment('gold')}>Buy Gold</button>
                </div>
            </div>
        </div>
    </div>
}
export default Premium;