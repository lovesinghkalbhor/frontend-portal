import * as Yup from "yup";
export default Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(1).required("Please enter your password"),
});
