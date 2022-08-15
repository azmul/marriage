import S from "fluent-json-schema";

const bodyJsonSchema = S.object()
.prop("name", S.string().required())
.prop(
  "address",
  S.object().required()
    .prop("name", S.string().required())
    .prop("code", S.number().required())
);

const createSchema = {
body: bodyJsonSchema,
};

export { createSchema }