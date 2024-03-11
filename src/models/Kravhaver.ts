import { z } from "zod";

export const KravhaverSchema = z.object({
  linjeId: z.string(),
  kravhaverId: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const KravhavereSchema = z.array(KravhaverSchema);

export type Kravhaver = z.infer<typeof KravhaverSchema>;

export type Kravhavere = z.infer<typeof KravhavereSchema>;
