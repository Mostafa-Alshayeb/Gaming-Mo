"use client";
import Link from "next/link";
import Logo from "../defaults/Logo";
// import { Form } from "@/components/ui/form";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import MotionItem from "../defaults/MotionItem";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "../nav/FormInput";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { ToastContainer, toast } from "react-toastify";
import { login } from "@/app/actions/auth";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// import { redirect } from "next/navigation";
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

const Login = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
    startTransition(async () => {
      const res = await login(data);
      console.log(res);
      if (res.success) {
        toast.success(res.success);
        setTimeout(() => router.push("/"), 1000);
      } else toast.error(res.error);
    });
  };
  return (
    <MotionItem
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      initial={{ opacity: 0, y: 100 }}
    >
      <MaxWidthWrapper
        customPadding={"py-14 lg:py-12"}
        className="flex flex-col gap-4 items-center w-full bg-black/60 rounded-2xl  border-input px-8   "
      >
        <Logo className=" text-3xl my-5 font-semibold border-r--cyan-50" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex  w-full flex-col gap-6 "
          >
            <FormInput label="Email" name="email" type="text" />
            <FormInput label="Password" name="password" type="password" />
            <Button
              type="submit"
              disabled={isPending}
              className=" cursor-pointer bg-cyan-300/70 text-base font-semibold "
            >
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
        <div className="capitalize flex items-center gap-2 text-base font-semibold">
          <p className="text-white">Do not have an account ?!</p>
          <Link href={"/signup"} className="text-cyan-400 hover:underline">
            Register With Us Now!
          </Link>
        </div>
      </MaxWidthWrapper>
    </MotionItem>
  );
};

export default Login;
