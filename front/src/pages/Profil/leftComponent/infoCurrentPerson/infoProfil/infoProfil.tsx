import * as React from 'react'
import "../../../styleProfilPage/mainCSS.css"
import "../infoProfilComponent.css"
import "./infoProfile.css"
import PPictures from "../../../../image/kdi-noce.jpg"
import {ButtonsFriends} from "./tools/buttonsFriends"
import {MyName} from "./tools/personalInformations"

export const InfoProfileUser = (): JSX.Element => {
	return (
			<div className="information-user-component red-border">
				<div className="profil-pictures-component blue-border">

				</div>
				<div className="text-information-component green-border">
					<ButtonsFriends/>
					<MyName name="kdi-noce"/>
				</div>
			</div>
	);
}