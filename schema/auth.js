import S from "fluent-json-schema";

const loginJsonSchema = S.object()
  .prop("email", S.string().format(S.FORMATS.EMAIL).required())
  .prop("password", S.string().required())

const loginSchema = {
  body: loginJsonSchema,
};

export { loginSchema };
