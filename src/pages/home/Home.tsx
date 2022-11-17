import { getDocs, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { Post } from "./Post";

//interface that defines what a post looks like (Typescript)
export interface Post {
	id: string;
	userId: string;
	title: string;
	username: string;
	description: string;
}

export const Home = () => {
	//No need for reactQuery bcz firebase already have methods that fetch our data
	const [postsLists, setPostsLists] = useState<Post[] | null>(null);
	const postsRef = collection(db, "posts");

	const getPosts = async () => {
		const data = await getDocs(postsRef);
		//how to destructure firebase object to get what we want => a list of object containing each data
		setPostsLists(
			data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
		);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div>
			{postsLists?.map((post) => (
				<Post post ={post}/>
			))}
		</div>
	);
};
