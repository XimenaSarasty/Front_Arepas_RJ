import React from 'react'
import { CloseNav } from '../components/CloseNav'
import PaymentDetails from '../components/PaymentDetails'
import OrderReviewPayment from '../components/OrderReviewPayment'

const PaymentGateway = () => {
  return (
    <>
        <CloseNav/>
            <div className="container-ss">                
                <div className="left-side mt-5">
                    <PaymentDetails />
                </div>

                <div className="right-side mt-5 mr-2">
                    <OrderReviewPayment/>
                </div>
            </div>
    </>
  )
}

export default PaymentGateway
