import { serve } from "bun";
import { router } from "./routes";
import { broker } from "./broker";

broker.start(); // start consuming queues

serve({
  fetch: router.fetch,
  port: 3000,
});

