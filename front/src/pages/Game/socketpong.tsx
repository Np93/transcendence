import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import PongTest from "./Pong";
import GameScore from "./gameScore";
import MatchHistory from "./matchHistory";
import Ranking from "./gameRanking";

const SocketPong = () => {
	const socket = useSocket();
	const [page, setPage] = useState(false);
	const [player1, setplayer1] = useState("");
	const [player2, setplayer2] = useState("");
	const [search, setsearch] = useState("trouver un match")

	const [color, setColor] = useState({
		paddle: "white",
		ball: "white",
		map: "black"
	})


	useEffect(() => {
		if (socket) {
			socket.on("game", (data) => {
				if (typeof data === 'object') {
					setplayer1(data.player1.username);
					setplayer2(data.player2.username);
					setsearch("trouver un match");
					SetPage(true);
				}
				else {
					if (data === "recherche de partie")
						setsearch("recherche de match")
					else if (data === "fin de la recherche de partie")
						setsearch("trouver un match")
					else
						alert(data)
				}
			});
		}
		return () => {
			if (socket) {
				socket.off("game");
			}
		};
	}, [socket, search]);

	const matchmaking = (e: SyntheticEvent) => {
		e.preventDefault();

		console.log("matchmaking");
		if (socket) {
			socket.emit("matchmaking");
		}
	};

	//debug
	const clean = (e: SyntheticEvent) => {
		e.preventDefault();

		console.log("clean");
		if (socket) {
			socket.emit("clean");
			setPage(false)
		}
	};

	const SetPage = (bool: boolean) => {
		setPage(bool);
	}

	const paddleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setColor({ ...color, paddle: event.target.value });
	}

	const ballChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setColor({ ...color, ball: event.target.value });
	}

	const mapChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setColor({ ...color, map: event.target.value });
	}
	//flex h-full w-full flex-wrap justify-between align-between

	/*bg-white h-1/2 w-3/5"*/
	return (
		<div className="flex w-full h-19/20 p-12">
			{!page &&
				<div className="flex h-full w-full flex-wrap justify-between align-between">
					<div className="bg-white h-1/2 w-3/5">
						<div className="">
							<button onClick={matchmaking} className="">
								{search}
							</button>
							<div>
								couleur de la raquette :
								<select name="paddleColor" style={{ backgroundColor: color.paddle, color: color.paddle }} onChange={paddleChange}>
									<option value="white" style={{ backgroundColor: 'white', color: 'white' }}>white</option>
									<option value="red" style={{ backgroundColor: 'red', color: 'red' }}>red</option>
									<option value="green" style={{ backgroundColor: 'green', color: 'green' }}>green</option>
								</select>
								{color.paddle}
							</div>
							<div>
								couleur de la balle :
								<select name="paddleColor" style={{ backgroundColor: color.ball, color: color.ball }} onChange={ballChange}>
									<option value="white" style={{ backgroundColor: 'white', color: 'white' }}>white</option>
									<option value="red" style={{ backgroundColor: 'red', color: 'red' }}>red</option>
									<option value="green" style={{ backgroundColor: 'green', color: 'green' }}>green</option>
								</select>
								{color.ball}
							</div>
							<div>
								couleur du terrain :
								<select name="paddleColor" style={{ backgroundColor: color.map, color: color.map }} onChange={mapChange}>
									<option value="black" style={{ backgroundColor: 'black', color: 'black' }}>black</option>
									<option value="gold" style={{ backgroundColor: 'gold', color: 'gold' }}>gold</option>
									<option value="silver" style={{ backgroundColor: 'silver', color: 'silver' }}>silver</option>
								</select>
								{color.map}
							</div>
						</div>
					</div>
					<Ranking />
					<div className="h-1/2 w-2/5 bg-gray-300"></div>
					<MatchHistory />
				</div >
			}
			{
				page &&
				<div>
					<div className="players">
						<div className="player">{player1}</div>
						<div className="player">{player2}</div>
					</div>
					<GameScore SetPage={SetPage} />
					<PongTest color={color} />
					<button onClick={clean}>clean</button>
				</div>
			}
		</div >
	);
};

export default SocketPong;