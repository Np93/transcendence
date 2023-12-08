import React, { SyntheticEvent, useCallback, useState } from "react";
import { useAuth } from '../../ui/organisms/useAuth';
import FormProps from './interface/FormDto';
import axios from "axios";
import { Account } from "../../ui/types";
import { log } from "console";

const LoginForm: React.FC<FormProps> = ({
	data,
	handleChange,
	settingPage,
	showPassword,
	togglePassword
}) => {

	const [errorMessage, setErrorMessage] = useState<string>();
	const { authenticate } = useAuth();

	const loginSubmit = async (e: SyntheticEvent) => {
		setErrorMessage("")
		e.preventDefault();
		try {
			const obj =
			{
				username: data.username,
				password: data.password
			}
			const response = await axios.post("http://localhost:4000/authentication/login", obj, { withCredentials: true });
			if (response.data.message) {
				authenticate();
			} else {
				settingPage("twofa")
			}
		} catch (error) {
			setErrorMessage("Username or Password invalid")
			// setAccount(null);
		}

	};

	return (
		<div className="flex items-center justify-center h-screen w-full">
			<form onSubmit={loginSubmit} className="w-[450px] h-[550px] bg-black/80 rounded-4xl shadow-md flex flex-col  items-center shadow-white">
				<div className="w-full h-1/6  mt-3 flex justify-center items-center" >
					<h1 className="text-7xl text-white" >Login</h1>
				</div>
				<div className="w-full h-3/6 mt-5 flex flex-col justify-end pb-5 items-center" >
					{errorMessage &&
						<h2 className="text-red-500">{errorMessage}</h2>}
					<label htmlFor="text" className="w-2/3">
						<input className='w-full h-14 rounded-3xl pl-5 mt-1'
							type="text"
							name="username"
							value={data.username}
							onChange={handleChange}
							placeholder='username'
						/>
					</label>
					<label htmlFor="password" className="w-2/3">
						<input className='w-full h-14 rounded-3xl mt-5 pl-5'
							type={showPassword ? "text" : "password"}
							name="password"
							value={data.password}
							onChange={handleChange}
							placeholder='password'
						/>
					</label>
					<div className="text-start">
						<input type="checkbox" onClick={togglePassword}></input>
						<a className="text-lg ml-2 text-white">show password</a>
					</div>
					<button type="submit" className="border-2 w-1/3 mt-3 border-white hover:bg-slate-100 hover:text-black text-white font-bold  rounded-full shadow-black shadow-xl hover:transform hover:scale-110 transition duration-300">
						Login
					</button>
				</div>
				<div className="w-full h-1/6 flex flex-col mt-3 justify-center items-center" >
					<div className=' text-start flex mt-3 text-white'>
						Don't have an account?
					</div>
					<button onClick={() => settingPage("signup")} className="border-2 w-1/3 mt-2 border-white hover:bg-slate-100 hover:text-black text-white font-bold  rounded-full shadow-black shadow-xl hover:transform hover:scale-110 transition duration-300">
						Signup
					</button>
				</div>
			</form>
		</div>
	);
};
export default LoginForm;