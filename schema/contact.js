import S from "fluent-json-schema";

const contactContactJsonSchema = S.object()
  .prop("name", S.string().required())
  .prop("phone", S.string().required())
  .prop("email", S.string().format(S.FORMATS.EMAIL).required())
  .prop("subject", S.string())
  .prop("message", S.string())

const createContactSchema = {
  body: contactContactJsonSchema,
};

export { createContactSchema };
