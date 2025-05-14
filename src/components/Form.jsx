// import React, { useState } from "react";

// const Form = () => {
//   const [input, setInput] = useState({ name: "", password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInput((prevInput) => ({
//       ...prevInput,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Form Data:", input); // ✅ Show data in console
//   };

//   return (
//     <div className="m-auto text-center mt-9">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           onChange={handleChange}
//           required
//           className="border mb-5"
//         />
//         <br />
//         <input
//           type="password"
//           name="password"
//           required
//           onChange={handleChange}
//           className="border mb-5"
//         />
//         <br />
//         <input type="submit" className="cursor-pointer px-4 bg-amber-200" />
//       </form>
//     </div>
//   );
// };

// export default Form;

import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const onSubmit = async (data) => {
    await delay(5);
    console.log(data);
  };
  return (
    <div className="m-auto text-center mt-9">
      {isSubmitting && <div>Loading...</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: { value: true, message: "this field is required" },
            minLength: { value: 3, message: "Min length is 3" },
            maxLength: { value: 8, message: "Max length is 8" },
          })}
          className="border mb-5"
        />
        {errors.name && (
          <div className="text-red-600">{errors.name.message}</div>
        )}
        <br />
        <input
          className="border mb-5"
          placeholder="password"
          {...register("password", {
            required: { value: true, message: "password is required" },
            minLength: { value: 7, message: "Min length of password is 7" },
          })}
          type="password"
        />
        {errors.password && (
          <div className="text-red-600">{errors.password.message}</div>
        )}
        <br />
        <input
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer px-4 bg-amber-200"
        />
      </form>
    </div>
  );
};

export default Form;
