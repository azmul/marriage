export const contactPayload = (data) => {
  return {
    name: data.name,
    phone: data.phone,
    email: data.email,
    subject: data.subject,
    message: data.message
  }
}