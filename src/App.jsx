import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import UsersList from './assets/components/UsersList';
import UsersForm from './assets/components/UsersForm';

function App() {
	const [users, setUsers] = useState();
	const [updateInfo, setUpdateInfo] = useState();
	const [formOpen, setFormOpen] = useState(false);

	const getAllUsers = () => {
		const URL = 'https://users-crud1.herokuapp.com/users/';
		axios
			.get(URL)
			.then((res) => setUsers(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getAllUsers();
	}, []);
	const handleOpenForm = () => setFormOpen(true);
	const handleCloseForm = () => setFormOpen(false);

	return (
		<div className='App wrapper'>
			<div className='hero-container'>
				<h1>Users</h1>
				<button className='open-form' onClick={handleOpenForm}>
					{updateInfo ? 'Update User' : 'Create New User'}
				</button>
			</div>
			<div className={formOpen ? 'form-container' : 'form-none'}>
				<UsersForm
					getAllUsers={getAllUsers}
					updateInfo={updateInfo}
					setUpdateInfo={setUpdateInfo}
					handleCloseForm={handleCloseForm}
				/>
			</div>
			<div className='users-container '>
				{users?.map((user) => (
					<UsersList
						key={user.id}
						user={user}
						getAllUsers={getAllUsers}
						setUpdateInfo={setUpdateInfo}
						handleOpenForm={handleOpenForm}
					/>
				))}
			</div>
		</div>
	);
}

export default App;

