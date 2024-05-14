import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z
    .string()
    .min(1, {
      message: "Enter a valid email",
    })
    .email("This is not a valid email"),
  password: z.string().min(4, {
    message: "Password must be 4 characters long",
  }),
});

const Signup = () => {
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="bg-white  p-6 w-[400px] lg:-mt-32 sm:-mt-20 md:-mt-12 h-full rounded-lg ">
      <p className="text-2xl font-semibold font-sans text-black mb-4">
        Signup to Mait Connect
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <div>
                  <FormItem className="mb-4">
                    <FormLabel className="text-black mt-2 py-2 text-lg">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        {...field}
                        className="text-black mb-4"
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className="text-black mt-2 py-2 text-lg">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="text-black mb-4"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className="text-black mt-2 py-2 text-lg">
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@gmail.com"
                        {...field}
                        className="text-black mb-4"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel className="text-black mt-2 py-2 text-lg">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        className="text-black mb-4"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
