import { getDocs, collection } from "firebase/firestore";
import { db } from "../../configs/firebase";
import Post from "./Post";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

export interface Post {
  id: string;
  title: string;
  description: string;
  user_name: string;
  user_id: string;
}

const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");
  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Stack
      flexDirection={"column"}
      alignItems={"center"}
      width={"500px"}
      gap={3}
      mt={"50px"}
      margin={"50px auto"}
    >
      {postsList?.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </Stack>
  );
};

export default Main;
