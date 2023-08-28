import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Post as IPost } from "./Main";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props {
  post: IPost;
}

interface Like {
  user_id: string;
  like_id: string;
}

const Post = (props: Props) => {
  const { post } = props;

  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("post_id", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({
        user_id: doc.data().user_id,
        like_id: doc.id,
      }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        user_id: user?.uid,
        post_id: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { user_id: user?.uid, like_id: newDoc.id }]
            : [{ user_id: user?.uid, like_id: newDoc.id }]
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("post_id", "==", post.id),
        where("user_id", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) =>
            prev &&
            prev.filter((like) => {
              return like.like_id !== likeId;
            })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const hasUserLiked = likes?.find((like) => {
    return like?.user_id === user?.uid;
  });

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        src="https://getwallpapers.com/wallpaper/full/e/0/a/15276.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={hasUserLiked ? removeLike : addLike}
        >
          <FavoriteIcon sx={{ color: hasUserLiked ? "red" : "" }} />
        </IconButton>
        {likes && <Typography>{likes.length}</Typography>}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
