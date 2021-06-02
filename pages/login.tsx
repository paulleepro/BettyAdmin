import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { CenteredLayout } from "../layouts/CenteredLayout";
import { postLogin } from "../lib/api";
import { selectUser, setUser } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const LOGIN_ERRORS = {
  1: "You entered an incorrect username, password, or both.",
  2: "There was a problem logging you in, please try again later.",
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    postLogin(data).then(async (r) => {
      if (!r.ok) {
        if (r.status === 401) {
          setError(LOGIN_ERRORS[1]);
          return;
        }
        setError(LOGIN_ERRORS[2]);
        return;
      }

      const res = await r.json();
      dispatch(setUser(res));
    });
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  if (user) {
    return null;
  }

  return (
    <CenteredLayout maxWidth="32rem">
      <form data-testid="loginform" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="username"
          data-testid="username"
          label="Username"
          placeholder="Username"
          required
          {...register("username", { required: true })}
        />
        <Input
          data-testid="password"
          label="Password"
          placeholder="Password"
          type="password"
          required
          {...register("password", { required: true })}
        />
        <Button type="submit" data-testid="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </CenteredLayout>
  );
}
