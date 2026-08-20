import { z } from "zod";

import { identitySchema } from "./identity.schema";
import { contactSchema } from "./contact.schema";
import { shopSchema } from "./shop.schema";
import { socialSchema } from "./social.schema";
import { addressSchema } from "./address.schema";

export const profileSchema = identitySchema
  .extend(contactSchema.shape)
  .extend(identitySchema.shape)
  .extend(shopSchema.shape)
  .extend(socialSchema.shape)
  .extend(addressSchema.shape);

export type ProfileFormValues = z.infer<typeof profileSchema>;