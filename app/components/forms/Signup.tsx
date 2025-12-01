// "use client";
// import React, { useTransition } from "react";
// import MotionItem from "../defaults/MotionItem";
// import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
// import Logo from "../defaults/Logo";
// import { Form } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import FormInput from "../nav/FormInput";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import FileUploadDemo from "../nav/FileUpload";
// import { signUp } from "@/app/actions/auth";
// import { toast, ToastContainer } from "react-toastify";
// import { redirect } from "next/navigation";
// import "react-toastify/dist/ReactToastify.css";
// const singubSchema = z
//   .object({
//     avatar: z.any().optional(),
//     name: z.string().min(3, { message: "Name must be at least 5 characters" }),
//     email: z.string().email({ message: "Please enter a valid email" }),
//     password: z
//       .string()
//       .min(5, { message: "Password must be at least 5 characters" }),
//     confirmPassword: z
//       .string()
//       .min(5, { message: "Password must be at least 5 characters" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
// const Signup = () => {
//   const form = useForm<z.infer<typeof singubSchema>>({
//     resolver: zodResolver(singubSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       avatar: undefined,
//     },
//   });

//   const [isPending, startTransition] = useTransition();
//   const onSubmit = async (data: z.infer<typeof singubSchema>) => {
//     console.log(data);
//     startTransition(async () => {
//       if (data.avatar) {
//         const formData = new FormData();
//         formData.append("file", data.avatar[0]);
//         formData.append(
//           "upload_preset",
//           process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
//         );
//         try {
//           const res = await fetch(
//             `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//             {
//               method: "POST",
//               body: formData,
//             }
//           );
//           console.log(res);
//           if (!res.ok) {
//             const errorResponse = await res.json();
//             console.error("Cloudinary Error:", errorResponse);
//             throw new Error("Failed to upload photo");
//           }

//           const cloudinaryData = await res.json();
//           data.avatar = {
//             secure_url: cloudinaryData.secure_url,
//             public_id: cloudinaryData.public_id,
//           };
//         } catch (error) {
//           console.error("Photo upload failed:", error);
//           return;
//         }
//       }
//       const response = await signUp(data);
//       console.log(response);

//       if (response?.success) {
//         toast.success(response.success);
//         redirect("/login");
//       } else toast.error(response.error);
//     });
//   };
//   return (
//     <MotionItem
//       whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
//       initial={{ opacity: 0, y: 100 }}
//     >
//       <MaxWidthWrapper
//         customPadding={" py-14"}
//         className="flex flex-col gap-4 items-center w-full bg-black/60 rounded-2xl  border-input px-8   "
//       >
//         <Logo className=" text-2xl my-5 font-semibold border-r--cyan-50" />
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className=" flex  w-full flex-col gap-6 "
//           >
//             <FileUploadDemo name="avatar" />
//             <FormInput label="Name" name="name" type="text" />
//             <FormInput label="Email" name="email" type="text" />
//             <FormInput label="Password" name="password" type="password" />
//             <FormInput
//               label="Confirm Password"
//               name="confirmPassword"
//               type="password"
//             />
//             <Button
//               type="submit"
//               className=" cursor-pointer bg-cyan-300/70 text-base font-semibold "
//             >
//               Submit
//             </Button>
//           </form>
//         </Form>
//         <div className=" capitalize flex items-center gap-2 text-base font-semibold">
//           <p className="text-white">Already Have An Account ?!</p>
//           <Link href={"/login"} className="text-cyan-400 hover:underline">
//             Login in To Your Account
//           </Link>
//         </div>
//       </MaxWidthWrapper>
//     </MotionItem>
//   );
// };

// export default Signup;

"use client";

import React, { useTransition } from "react";
import MotionItem from "../defaults/MotionItem";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import Logo from "../defaults/Logo";
import { Form } from "@/components/ui/form";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "../nav/FormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUploadDemo from "../nav/FileUpload";
import { signUp } from "@/app/actions/auth";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const signupSchema = z
  .object({
    avatar: z.any().optional(),
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const Signup = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    startTransition(async () => {
      try {
        // Upload avatar if provided
        if (data.avatar?.[0] && cloudName && uploadPreset) {
          const formData = new FormData();
          formData.append("file", data.avatar[0]);
          formData.append("upload_preset", uploadPreset);

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: "POST", body: formData }
          );

          if (!res.ok) {
            const errorResponse = await res.json();
            console.error("Cloudinary Error:", errorResponse);
            throw new Error("Failed to upload photo");
          }

          const cloudinaryData = await res.json();
          data.avatar = {
            secure_url: cloudinaryData.secure_url,
            public_id: cloudinaryData.public_id,
          };
        }

        const response = await signUp(data);

        if (response?.success) {
          toast.success(response.success);
          setTimeout(() => redirect("/login"), 1000);
        } else {
          toast.error(response?.error || "Signup failed");
        }
      } catch (error: any) {
        toast.error(error.message || "An error occurred during signup");
      }
    });
  };

  return (
    <MotionItem
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      initial={{ opacity: 0, y: 100 }}
    >
      <MaxWidthWrapper
        customPadding="py-14"
        className="flex flex-col gap-4 items-center w-full bg-black/60 rounded-2xl border-input px-8"
      >
        <Logo className="text-2xl my-5 font-semibold border-r--cyan-50" />
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-6"
            >
              <FileUploadDemo name="avatar" />
              <FormInput label="Name" name="name" type="text" />
              <FormInput label="Email" name="email" type="text" />
              <FormInput label="Password" name="password" type="password" />
              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer bg-cyan-300/70 text-base font-semibold"
              >
                {isPending ? "Loading..." : "Submit"}
              </Button>
            </form>
          </Form>
        </FormProvider>
        <div className="capitalize flex items-center gap-2 text-base font-semibold">
          <p className="text-white">Already Have An Account ?!</p>
          <Link href="/login" className="text-cyan-400 hover:underline">
            Login to Your Account
          </Link>
        </div>
      </MaxWidthWrapper>
    </MotionItem>
  );
};

export default Signup;
