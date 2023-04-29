import * as Yup from "yup";
let validationSchema;
export default validationSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(1).required("Please enter your password"),
});
