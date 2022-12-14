import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
	title: string;
	description: string;
}

export const CreateForm = () => {
	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	//Validation
	const schema = yup.object().shape({
		title: yup.string().required("Needs a Title"),
		description: yup.string().required("Needs a Description"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateFormData>({
		resolver: yupResolver(schema),
	});

	// Reference to a collection in the db
	const postsRef = collection(db, "posts");

	const onCreatePost = async (data: CreateFormData) => {
		await addDoc(postsRef, {
			// title: data.title,
			// description: data.description,
			// If we are just grabbing everything from the data
			...data,
			username: user?.displayName,
			userId: user?.uid,
		});

		navigate("/");
	};

	return (
		<form onSubmit={handleSubmit(onCreatePost)}>
			<input placeholder="Title..." {...register("title")} />
			<p style={{ color: "red" }}>{errors.title?.message}</p>
			<textarea placeholder="Description..." {...register("description")} />
			<p style={{ color: "red" }}>{errors.description?.message}</p>
			<input className="submit-form" type="submit" />
		</form>
	);
};
