import * as React from "react"
import "./leftComponent.css"
import {GameStats} from "./infoCurrentUserStats/componentInfoGame"
import {InfoProfilComponent} from "./infoCurrentPerson/InfoProfilComponent"

interface Props {
	className?: string;
}

export const LeftComponent = ({className}: Props) => {
	return (
		<div className="left-component-main text-xs red-border">
			<div className="w-full p-4 h-56 bg-white/50 rounded-3xl items-center flex-col flex my-1 sm:w-2/5">
				<h1 className="text-3xl sm:text-3xl font-bold h-10">Ranking</h1>
				<div className="h-[9.5rem] w-full  overflow-y-auto">
					<table className="table-auto w-full">
						<thead>
						<tr>
							<th>rank</th>
							<th>name</th>
							<th>points</th>
						</tr>
						</thead>
						<tbody className="text-center">
						<tr className="text-blue-800">
							<td>{myIndex + 1}</td>
							<td>{myRank?.score}</td>
							<td>{myRank?.username}</td>
						</tr>
						{rank.map((user, id) => (
							<tr key={id} className="">
								<td>{id + 1}</td>
								<td className="">{user.score}</td>
								<td>{user.username}</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>
			{/*<div className="info-profile-component red-border"*/}
			{/*	 style={{gridTemplateRows: "5fr 2fr 1fr"}}>*/}
			{/*	<InfoProfilComponent/>*/}
			{/*</div>*/}
			{/*<div className="user-stat-component red-border">*/}
			{/*	<GameStats/>*/}
			{/*</div>*/}
		</div>
	);
}