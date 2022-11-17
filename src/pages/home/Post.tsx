import {
	addDoc,
	getDocs,
	collection,
	query,
	where,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post as IPost } from "./Home";

// every individual post

interface Props {
	post: IPost;
}

interface Like {
  likeId: string;
	userId: string;
}

export const Post = (props: Props) => {
	const { post } = props;
	const [user] = useAuthState(auth);
	const [likes, setLikes] = useState<Like[] | null>(null);

	const likesRef = collection(db, "likes");

	//likesDoc get all the data from the likes collection that has the same postId as the current post we are looping through
	const likesDoc = query(likesRef, where("postId", "==", post.id));

	const addLike = async () => {
		try {
			// try-catch just in case addDoc fails, then it wont try to add to our state likes
			const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
			//while we add to db we also manually update UI with states which can refresh pages
			if (user) {
				setLikes((prev) =>
					prev ? [...prev, { userId: user?.uid, likeId: newDoc.id}] : [{ userId: user?.uid, likeId: newDoc.id }]
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getLikes = async () => {
		const data = await getDocs(likesDoc);
		setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
	};

	const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

	const removeLike = async () => {
		try {
			//querying the specific like we want to delete, getting that data from that like (to get the ID of it), then delete that like
			const likeToDeleteQuery = query(
				likesRef,
				where("postId", "==", post.id),
				where("userId", "==", user?.uid)
			);

			const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id
			const likeToDelete = doc(db, "likes", likeId);
			await deleteDoc(likeToDelete);

      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId))
      }

		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getLikes();
	}, []);

	return (
		<div>
			<div className="title">
				<h1>{post.title}</h1>
			</div>
			<div className="body">
				<p>{post.description}</p>
			</div>
			<div className="footer">
				<p>@{post.username}</p>
				<button onClick={hasUserLiked ? removeLike : addLike}>
					{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
				</button>
				{likes && <p>Likes: {likes?.length}</p>}
			</div>
		</div>
	);
};
