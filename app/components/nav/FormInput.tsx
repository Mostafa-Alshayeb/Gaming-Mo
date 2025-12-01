"use client";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const FormInput = ({
  name,
  label,
  type,
}: {
  name: string;
  label: string;
  type?: string;
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className=" text-gray-50 text-base">{label}</FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={label}
              className=" text-base font-semibold text-white w-full border-input"
              {...field}
            />
          </FormControl>
          <FormMessage className=" text-cyan-500 text-sm font-semibold" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
