import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const defaultValue = {
	email: '',
	password: '',
	first_name: '',
	last_name: '',
	birthday: '',
};

const UsersForm = ({
	getAllUsers,
	updateInfo,
	setUpdateInfo,
	handleCloseForm,
}) => {
	useEffect(() => {
		if (updateInfo) {
			reset(updateInfo);
		}
	}, [updateInfo]);

	const createUser = (data) => {
		const URL = 'https://users-crud1.herokuapp.com/users/';
		axios
			.post(URL, data)
			.then((res) => {
				console.log(res.data);
				getAllUsers();
			})
			.catch((err) => console.log(err));
	};
	const updateUser = (data) => {
		const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`;
		axios
			.patch(URL, data)
			.then((res) => {
				console.log(res.data);
				getAllUsers();
			})
			.catch((err) => console.log(err));
	};

	const { register, reset, handleSubmit } = useForm();

	const submit = (data) => {
		if (updateInfo) {
			updateUser(data);
			setUpdateInfo();
		} else {
			createUser(data);
		}
		reset(defaultValue);
		handleCloseForm();
	};

	const handleCloseandReset = () => {
		handleCloseForm();
		setUpdateInfo();
		reset(defaultValue);
	};

	return (
		<form onSubmit={handleSubmit(submit)} className='form'>
			<div onClick={handleCloseandReset} className='form-close'>
				x
			</div>
			<h2 className='form-title'>
				{updateInfo ? 'Update User info' : 'Create New User'}
			</h2>
			<ul className='form-list'>
				<li className='form-item'>
					<label htmlFor='name'>Name</label>
					<input
						{...register('first_name')}
						placeholder='name'
						type='text'
						id='name'
					/>
				</li>
				<li className='form-item'>
					<label htmlFor='last-name'>Last Name</label>
					<input
						{...register('last_name')}
						placeholder='last name'
						type='text'
						id='last-name'
					/>
				</li>
				<li className='form-item'>
					<label htmlFor='email'> Email</label>
					<input
						{...register('email')}
						placeholder='email'
						type='email'
						id='email'
					/>
				</li>
				<li className='form-item'>
					<label htmlFor='password'>Password</label>
					<input
						{...register('password')}
						placeholder='password'
						type='text'
						id='password'
					/>
				</li>
				<li className='form-item'>
					<label htmlFor='birthday'> Birthday</label>
					<input {...register('birthday')} type='date' id='birthday' />
				</li>
			</ul>
			<button className='form_btn'>
				{updateInfo ? 'Update User' : 'Create New User'}
			</button>
		</form>
	);
};

export default UsersForm;
