import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
  origin: "*",
});

app.get("/", () => {
  return {
    message: "hello, world",
  };
});

app.post(
  "/uploads",
  {
    schema: {
      body: z.object({
        url: z.url(),
      }),
    },
  },
  (request, reply) => {
    const { url } = request.body;

    console.log("URL: ", url);

    return reply.status(201).send();
  },
);

app.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.log("HTTP Server Running");
});
