export const candidatesRequestPayload = (data) => {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    biodataTotal: data.biodataTotal,
    price: data.price,
    biodata: data.biodata,
    paymentMethod: data.paymentMethod,
    paymentNumber: data.paymentNumber,
    transactionId: data.transactionId
  }
}