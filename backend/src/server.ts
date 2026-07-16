import Fastify from "fastify";
import { app, options } from "./app";

const server = Fastify(options);

await server.register(app, options);

try {
	await server.listen({
		host: process.env.HOST ?? "0.0.0.0",
		port: Number(process.env.PORT ?? 3000),
	});
} catch (error) {
	server.log.error(error);
	process.exit(1);
}
