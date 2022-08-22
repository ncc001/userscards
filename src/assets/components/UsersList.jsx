import React from 'react';
import axios from 'axios';

const CardUsers = ({ user, getAllUsers, setUpdateInfo, handleOpenForm }) => {
	const deleteUser = () => {
		const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`;
		axios
			.delete(URL)
			.then((res) => {
				console.log(res.data);
				getAllUsers();
			})
			.catch((err) => console.log(err));
	};
	const handleUpdateClick = () => {
		setUpdateInfo(user);
		handleOpenForm();
	};
	// const handleClick = () => {
	// 	alert('button click catched');
	// };

	return (
		<article className='card-users'>
			<div className='users-title '>
				<h2>{`${user.first_name} ${user.last_name}`}</h2>
			</div>
			<div className='users-info'>
				<ul>
					<li className='users-item'>
						<span>Email:</span>
						{user.email}
					</li>
					<li className='users-item'>
						<span>birthday:</span>

						<p className='no-margin'>
							<i className='bx bx-gift'></i>
							{user.birthday}
						</p>
					</li>
				</ul>
			</div>
			<footer className='users-footer'>
				<button className='btn-cards del' onClick={deleteUser}>
					<i className='bx bx-x-circle'></i>
				</button>
				<button className='btn-cards' onClick={handleUpdateClick}>
					<i className='bx bxs-edit'></i>
				</button>
			</footer>
		</article>
	);
};

export default CardUsers;
