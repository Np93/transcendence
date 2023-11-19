import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSocket } from '../../ui/organisms/SocketContext';

interface friend {
	id: number
	username: string
	status: number
	friend_status: number
}

const Friends = () => {

	const [friends, setFriends] = useState<friend[]>([]);
	const [sorted, setSorted] = useState<friend[]>([]);
	const [attente, setAttente] = useState<friend[]>([]);
	const [ajoute, setAjoute] = useState<friend[]>([]);
	const socket = useSocket();

	useEffect(() => {
		const sort = friends.filter(e => e.friend_status === 0)
		sort.sort((a, b) => a.status - b.status)
		setSorted(sort)

		const add = friends.filter(e => e.friend_status === 1)
		setAjoute(add)

		const wait = friends.filter(e => e.friend_status === 2)
		setAttente(wait)
	}, [friends]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get("http://localhost:4000/friends/friends", { withCredentials: true });
				console.log("data = ", response.data)
				setFriends(response.data)
			} catch (error) {
				console.error("Erreur lors de la récupération des users :", error);
			}
		}
		getUsers();
	}, []);


	useEffect(() => { //socket
		if (socket) {
			socket.on("status", (data) => {
				console.log(data)
				setFriends((prevUser) => prevUser.map(user => user.username === data.username ? { ...user, status: data.status } : user))
			})
		}
		return () => {
			if (socket) {
				socket.off("status");
			}
		};
	}, [socket]);

	function getStatusColor(status: number) {
		switch (status) {
			case 0:
				return 'blue'; // Hors ligne
			case 1:
				return 'green'; // En ligne
			case 2:
				return 'red'; // En jeu
			default:
				return 'black'; // Par défaut (au cas où)
		}
	}

	const sendResponse = async (userId: number, accept: boolean) => {
		const data = {
			id: userId,
			accept: accept
		}
		await axios.post("http://localhost:4000/friends/acceptFriend", data, { withCredentials: true }).then((response) => {
			alert(response.data)
			if (accept === true)
				setFriends((prevUser) => prevUser.map(user => user.id === data.id ? { ...user, friend_status: 0 } : user))
			else {
				const reject = friends.filter(e => e.id !== userId)
				setFriends(reject)
			}
			//const add = ajoute.filter(e => e.id !== userId)
			//setAjoute(add)
		}).catch((error) => {
			alert(error)
		})
	}

	const deleteFriend = async (userId: number) => {
		const data = {
			id: userId,
		}
		await axios.post("http://localhost:4000/friends/removeFriend", data, { withCredentials: true }).then((response) => {
			alert(response.data)
			const del = friends.filter(e => e.id !== userId)
			setFriends(del)
		}).catch((error) => {
			alert(error)
		})
	}

	return (
		<div className="status">
			<h1>Liste des amis</h1>
			<h2>ami</h2>
			{sorted.map(u =>
				<p style={{ color: getStatusColor(u.status) }} key={u.id}>
					{u.username}
					<button onClick={() => deleteFriend(u.id)}>x</button>
				</p>)}
			<h2>ami a ajouter</h2>
			{ajoute.map(u =>
				<p key={u.id}>
					{u.username}
					<button onClick={() => sendResponse(u.id, true)}>oui</button>
					<button onClick={() => sendResponse(u.id, false)}>non</button>
				</p>)}
			<h2>en attente d'ajout</h2>
			{attente.map(u => <p>{u.username}</p>)}
		</div>
	);
};

export default Friends;