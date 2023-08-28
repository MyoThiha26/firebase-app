import { Stack } from "@mui/material";
import CreateForm from "./CreateForm";

const AddPost = () => {
  return (
    <Stack
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <h1>Add Post</h1>
      <CreateForm />
    </Stack>
  );
};

export default AddPost;
