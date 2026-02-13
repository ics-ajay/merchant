"use server";
import { z } from "zod";

const loginParse = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginState = {
  success: boolean;
  errors?: {
    email?: string;
    password?: string;
  };
  values?: {
    email?: string;
  };
};

export async function login(
  prevState: any,
  formData: FormData,
): Promise<LoginState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  console.log(">>>>>>>>>>>>>>>>>>>.", rawData);

  const parsed = loginParse.safeParse(rawData);
  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return {
      success: false,
      errors: {
        email: flattened?.fieldErrors?.email?.[0],
        password: flattened?.fieldErrors?.password?.[0],
      },
      values: {
        email: rawData.email as string,
      },
    };
  }

  const data = parsed.data;
  console.log(">>>>>>>>>>>>>>>>>>>login data", data);
  //   todo:make api call

  return {
    success: true,
  };
}
