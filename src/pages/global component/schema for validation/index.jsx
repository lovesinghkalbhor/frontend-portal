import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format"),
  password: Yup.string().min(1, "Password must be at least 1 character long"),
  lastname: Yup.string().min(2, "String must be at least 2 characters long"),
  firstname: Yup.string().min(2, "String must be at least 2 characters long"),
});

export default validationSchema;
