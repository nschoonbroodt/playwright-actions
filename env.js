import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  INPUT_CLASS: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
