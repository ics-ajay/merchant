"use server";

import { z } from "zod";

const registerSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  documents: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Document is required"),
});

export type RegisterState = {
  success: boolean;
  errors?: {
    companyName?: string;
    contactPerson?: string;
    email?: string;
    password?: string;
    documents?: string;
  };
  values?: {
    companyName?: string;
    contactPerson?: string;
    email?: string;
  };
};

export async function registerUser(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const rawData = {
    companyName: formData.get("companyName"),
    contactPerson: formData.get("contactPerson"),
    email: formData.get("email"),
    password: formData.get("password"),
    documents: formData.get("documents"),
  };

  const parsed = registerSchema.safeParse(rawData);

  if (!parsed.success) {
    const flattened = parsed.error.flatten();

    return {
      success: false,
      errors: {
        companyName: flattened.fieldErrors.companyName?.[0],
        contactPerson: flattened.fieldErrors.contactPerson?.[0],
        email: flattened.fieldErrors.email?.[0],
        password: flattened.fieldErrors.password?.[0],
        documents: flattened.fieldErrors.documents?.[0],
      },
      values: {
        companyName: rawData.companyName as string,
        contactPerson: rawData.contactPerson as string,
        email: rawData.email as string,
      },
    };
  }

  // ✅ validated data
  const data = parsed.data;

  console.log("VALID DATA:", data);

  // todo: We will make server calls here

  return { success: true };
}
