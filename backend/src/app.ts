import { join } from "node:path";
import AutoLoad, { type AutoloadPluginOptions } from "@fastify/autoload";
import { MastraServer } from "@mastra/fastify";
import type { FastifyPluginAsync, FastifyServerOptions } from "fastify";
import { mastra } from "./mastra/index";

export interface AppOptions
	extends FastifyServerOptions,
		Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
	fastify,
	opts,
): Promise<void> => {
	const mastraServer = new MastraServer({ app: fastify, mastra });
	await mastraServer.init();

	// Do not touch the following lines

	// This loads all plugins defined in plugins
	// those should be support plugins that are reused
	// through your application
	// eslint-disable-next-line no-void
	void fastify.register(AutoLoad, {
		dir: join(import.meta.dirname, "plugins"),
		options: opts,
	});

	// This loads all plugins defined in routes
	// define your routes in one of these
	// eslint-disable-next-line no-void
	void fastify.register(AutoLoad, {
		dir: join(import.meta.dirname, "routes"),
		options: opts,
	});
};

export default app;
export { app, options };
