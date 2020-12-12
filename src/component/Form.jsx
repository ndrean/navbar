import React, { memo } from "react";
import { useForm } from "react-hook-form";

// import history from "../utils/history";
// import renderRoute from "./router";

// const wait = function (duree = 1000) {
//   return new Promise((resolve) => {
//     window.setTimeout(resolve, duree);
//   });
// };

const Form = memo(() => {
  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const { isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = async (data, e) => {
    console.log(data);
    e.target.reset();
  };

  // const [email, setEmail] = React.useState("");

  if (isSubmitSuccessful) {
    window.alert(`Welcome`);
  }

  console.log("React-Hook-Form -> render form");

  return (
    <div>
      <div style={{ backgroundColor: "white" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            style={{ marginTop: "20px" }}
            type="email"
            name="email"
            id="email"
            autoComplete="current-email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            ref={register({
              required: { value: true, message: "Required" },
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid, should be my@email.com",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {errors.email.message}
            </p>
          )}

          <div>
            <label htmlFor="password">Password</label>
            <input
              style={{ marginTop: "20px" }}
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              ref={register({
                required: { value: true, message: "Required" },
                minLength: {
                  value: 6,
                  message: "Password should be at-least 6 characters.",
                },
              })}
            />
            {errors.password && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
});

export default Form;
