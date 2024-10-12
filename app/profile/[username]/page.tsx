interface ProfilePagePropsI {
	params: { username: string }
}

const ProfilePage = ({ params }: ProfilePagePropsI) => {
	const { username } = params
	return <div>profilePage: {username}</div>
}
export default ProfilePage
