import { useEffect} from "react";
import MenuCard from "./MenuCard";
import ProfilCard from "./CardContent/ProfilCard";
import ChatCard from "./CardContent/ChatCard";
import Ranking from "../Game/Ranking";
import { useNavigate } from "react-router-dom";
import FriendsToAdd from "../Friend/component/AddFriend";
import { useSocket } from "../../ui/organisms/SocketContext";

const HomePage = () => {

    const navigate = useNavigate();
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on("game", (data) => {
                if (typeof data === 'object') {
                    navigate("/pong")
                }
            });
        }
        return () => {
            if (socket) {
                socket.off("game");
            }
        };
    }, [socket]);

    return (
        <div className="w-full h-[1500px] lg:h-[850px] py-10 px-2 xl:px-20" >
            <div className="grid grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-2 lg:grid-rows-2 w-full h-full p-2.5">
                <MenuCard>
                    <ProfilCard></ProfilCard>
                </MenuCard>
                <MenuCard>
                    <FriendsToAdd />
                </MenuCard>
                <MenuCard>
                    <ChatCard></ChatCard>
                </MenuCard>
                <MenuCard>
                    <Ranking></Ranking>
                </MenuCard>
            </div>
        </div>
    );
};

export default HomePage;
