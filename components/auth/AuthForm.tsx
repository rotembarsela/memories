"use client";

import { Button } from "@/features/button";
import { Input } from "@/features/forms";
import {
  useCallback,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Divider } from "../Divider";
import { AuthSocialLoginButton } from "./AuthSocialLoginButton";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { api } from "@/lib";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastError, ToastSuccess } from "@/features/toast";

type AuthFormProps = {
  variant: AuthVariant;
  setVariant: Dispatch<SetStateAction<AuthVariant>>;
};

export default function AuthForm({
  variant = "LOGIN",
  setVariant = () => {},
}: AuthFormProps) {
  const { status } = useSession();
  const { push } = useRouter();
  //const { ToastSuccess, ToastError } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    event?.preventDefault();
    setIsLoading(true);

    if (variant === "REGISTER") {
      try {
        await api.post("/api/register", data);
        ToastSuccess("Registered successfully");
      } catch (error) {
        ToastError("Something went wrong, please try again");
      }
    }

    if (variant === "LOGIN") {
      try {
        const isSignInSucess = await signIn("credentials", {
          ...data,
          redirect: false,
          callbackUrl: "/memories",
        });

        if (isSignInSucess?.error) {
          ToastError("Invalid Credentials");
        }

        if (isSignInSucess?.ok && !isSignInSucess.error) {
          ToastSuccess("Signed in successfully");
          if (isSignInSucess.url) {
            push(isSignInSucess.url);
          } else {
            push("/memories");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    setIsLoading(false);
  };

  const socialLoginAction = async (action: string) => {
    setIsLoading(true);

    try {
      const isSignInSucess = await signIn(action, { redirect: false });

      if (isSignInSucess?.error) {
        ToastError("Invalid Credentials");
      }

      if (isSignInSucess?.ok && !isSignInSucess.error) {
        ToastSuccess("Logged in successfully");
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const togglevariant = useCallback(() => {
    if (!isLoading) {
      variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN");
      reset();
    }
  }, [variant, isLoading]);

  useEffect(() => {
    if (status === "authenticated") {
      push("/memories");
    }
  }, [status, push]);

  return (
    <div className="mt-8 mx-auto w-full max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          {variant === "REGISTER" ? (
            <Input
              register={register}
              id="name"
              label="Name"
              type="text"
              errors={errors}
              disabled={isLoading}
            />
          ) : null}
          <Input
            register={register}
            id="email"
            label="Email"
            type="email"
            errors={errors}
            disabled={isLoading}
          />
          <Input
            register={register}
            id="password"
            label="Password"
            type="password"
            errors={errors}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            fullWidth
          >
            {variant === "REGISTER" ? "Register" : "Login"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Divider />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialLoginButton
              icon={BsGoogle}
              onClick={() => {
                socialLoginAction("google");
              }}
            />
            <AuthSocialLoginButton
              icon={BsFacebook}
              onClick={() => {
                socialLoginAction("facebook");
              }}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "REGISTER" ? "Already have an account?" : "New User?"}
          </div>
          <div onClick={togglevariant} className="underline cursor-pointer">
            {variant === "REGISTER" ? "Login" : "Create an account"}
          </div>
        </div>
      </div>
    </div>
  );
}
