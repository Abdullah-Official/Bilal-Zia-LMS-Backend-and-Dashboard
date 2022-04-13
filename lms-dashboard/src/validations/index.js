import * as Yup from "yup";

export const adminSignUpSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  adminSubject: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(16, "Too Long!")
    .required("Required"),
});
