import axios from "axios";
import { useEffect, useState } from "react";


const MatchHistory = () => {

	const [matchs, setMatchs] = useState<string[]>([]);

	useEffect(() => {
		const getHistory = async () => {
			try {
				const response = await axios.get("http://localhost:4000/game/history", { withCredentials: true });
				setMatchs(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération de l'historique des matchs :", error);
			}
		}
		getHistory();
	}, []);

	//h-1/2 w-3/5
	return (
		<div className="bg-white h-1/2 w-3/5">
			<h1>Match history</h1>
			{matchs.length === 0 && // si y-a pas de match
				<div>pas de match</div>}
			{matchs.map(match => <p>{match}</p>)}
		</div>
	);
}

export default MatchHistory;