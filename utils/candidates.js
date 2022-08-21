export const candidatesRequestPayload = (data) => {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    biodataTotal: data.biodataTotal,
    price: data.price,
    biodatas: data.biodatas,
    paymentMethod: data.paymentMethod,
    paymentNumber: data.paymentNumber,
    transactionId: data.transactionId,
    isProcess: false,
    comment: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
