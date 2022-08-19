import S from "fluent-json-schema";

/** Contact Request */
const contactBodyJsonSchema = S.object()
  .prop("name", S.string().required())
  .prop("email", S.string().format(S.FORMATS.EMAIL))
  .prop("phone", S.string().required())
  .prop("biodataTotal", S.number().required())
  .prop("price", S.number().required())
  .prop("biodata", S.string().required())
  .prop("paymentMethod", S.number().required())
  .prop("paymentNumber", S.string().required())
  .prop("transactionId", S.string().required())

const contactRequestSchema = {
  body: contactBodyJsonSchema,
};

export { contactRequestSchema };
