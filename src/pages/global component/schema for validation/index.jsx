import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email(),
  password: Yup.string().min(1),
});

export default validationSchema;
