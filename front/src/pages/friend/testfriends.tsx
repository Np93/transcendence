import Friends from "./friends";
import FriendsToAdd from "./friendsToAdd";
import Friendss from "./friendss";
import PendingFriend from "./pendingFriend";

const Testfriends = () => {
	return (
		<div className="w-full h-[800px] p-20">
			<div className="grid gap-2 grid-cols-2 grid-rows-2 w-full h-full">
				<Friends />
				<FriendsToAdd />
				<PendingFriend />
				<Friendss />
			</div>
		</div>
	)
}
export default Testfriends;