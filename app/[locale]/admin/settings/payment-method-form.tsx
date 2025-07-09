import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISettingInput } from "@/types";
import { TrashIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

// Predefined payment methods
const PREDEFINED_PAYMENT_METHODS = [
  { name: "Cash On Delivery", commission: 0, isPredefined: true },
  { name: "COD Advance", commission: 0, isPredefined: true },
  { name: "Online", commission: 0, isPredefined: true },
];

export default function PaymentMethodForm({
  form,
  id,
}: {
  form: UseFormReturn<ISettingInput>;
  id: string;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "availablePaymentMethods",
  });
  const {
    setValue,
    watch,
    control,
    formState: { errors },
  } = form;

  const availablePaymentMethods = watch("availablePaymentMethods");
  const defaultPaymentMethod = watch("defaultPaymentMethod");

  // Initialize with predefined methods if empty
  useEffect(() => {
    if (availablePaymentMethods?.length === 0) {
      PREDEFINED_PAYMENT_METHODS.forEach((method) => {
        append(method);
      });
    }
  }, [append, availablePaymentMethods]);

  // Validate default payment method
  useEffect(() => {
    const validCodes = availablePaymentMethods?.map((method) => method.name);
    if (!validCodes?.includes(defaultPaymentMethod)) {
      setValue("defaultPaymentMethod", "");
    }
  }, [availablePaymentMethods, defaultPaymentMethod, setValue]);

  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {fields?.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <FormField
                control={form.control}
                name={`availablePaymentMethods.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    {index === 0 && <FormLabel>Name</FormLabel>}
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Name"
                        disabled={
                          field.value &&
                          PREDEFINED_PAYMENT_METHODS.some(
                            (m) => m.name === field.value
                          )
                            ? true
                            : false
                        }
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.availablePaymentMethods?.[index]?.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`availablePaymentMethods.${index}.commission`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    {index === 0 && <FormLabel>Commission (%)</FormLabel>}
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Commission"
                        disabled={
                          field.value &&
                          PREDEFINED_PAYMENT_METHODS.some(
                            (m) =>
                              m.name === availablePaymentMethods[index]?.name
                          )
                            ? true
                            : false
                        }
                      />
                    </FormControl>
                    <FormMessage>
                      {
                        errors.availablePaymentMethods?.[index]?.commission
                          ?.message
                      }
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex items-end">
                {index === 0 && <div className="invisible">Action</div>}
                <Button
                  type="button"
                  variant="outline"
                  className="h-10"
                  onClick={() => remove(index)}
                  disabled={
                    fields.length <= 1 ||
                    PREDEFINED_PAYMENT_METHODS.some(
                      (m) => m.name === availablePaymentMethods[index]?.name
                    )
                  }
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant={"outline"}
            onClick={() => append({ name: "", commission: 0 })}
          >
            Add Custom Payment Method
          </Button>
        </div>

        <FormField
          control={control}
          name="defaultPaymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Payment Method</FormLabel>
              <FormControl>
                <Select
                  value={field.value || ""}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePaymentMethods
                      ?.filter((method) => method.name)
                      ?.map((method, index) => (
                        <SelectItem key={index} value={method.name}>
                          {method.name}{" "}
                          {method.commission ? `(${method.commission}%)` : ""}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>{errors.defaultPaymentMethod?.message}</FormMessage>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
