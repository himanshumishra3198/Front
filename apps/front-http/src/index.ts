import { serve } from "bun";
import { app } from "./app";

serve({
  port: 3001,
  fetch: app.fetch,
});

console.log("🔥 front-http running on http://localhost:3001");
