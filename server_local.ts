import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import handler from "./index.tsx";

const port = Number(Deno.env.get("PORT") ?? 8000);
console.log(`Server running on http://localhost:${port}`);

serve(handler, { addr: `:${port}` });
