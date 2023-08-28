import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("You must add title"),
    description: yup.string().required("You must add description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const [user] = useAuthState(auth);

  const postsRef = collection(db, "posts");

  const navigate = useNavigate();

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      user_name: user?.displayName,
      user_id: user?.uid,
    });
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onCreatePost)}>
        <Stack width={"300px"} flexDirection={"column"} gap={2}>
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            multiline
            maxRows={4}
            defaultValue=""
            {...register("title")}
          />
          <Typography sx={{ color: "red" }}>{errors.title?.message}</Typography>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue=""
            {...register("description")}
          />
          <Typography sx={{ color: "red" }}>
            {errors.description?.message}
          </Typography>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default CreateForm;
