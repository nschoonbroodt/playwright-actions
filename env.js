import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  INPUT_USER: z.string(),
  INPUT_CLASS: z.string(),
  INPUT_DAY: z.string(), // TODO coerce
  INPUT_HOUR: z.string(), // TODO Coerce
  INPUT_MINUTE: z.string(), // TODO Coerce
  INPUT_LOCATION: z.string(), // TODO check
  USER_NADA_LOGIN: z.string().email(),
  USER_NICOLAS_LOGIN: z.string().email(),
  USER_NADA_PASSWORD: z.string(),
  USER_NICOLAS_PASSWORD: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
