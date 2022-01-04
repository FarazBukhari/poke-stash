module.exports = {
	IGNORE_MIDDLEWARE_URLS: [
		'/',
		'/users/logIn',
		'/admin/logIn',
		'/users/signUp',
		'/users/confirmUser',
		'/users/forgetPassword',
		'/users/getUserById',
		'/users/reSendOtp',
		'/search/',
		'/search/topServiceProviders',
		'/admin/create',
		'profiles/getAllProfilesByUserId',
		'stripe/createExtraProfilePayment',
		'stripe/updateUserAftExtProPay'
	],
	USER: {
		TYPE: {},
		ADMIN_USER: () => {
			return [
				{
					firstName: 'shannon',
					lastName: 'admin',
					userName: 'shannon',
					image: 'String',
					email: 'T.i.p.shannon@outlook.com',
					role: 'admin',
					password: 'Password@1',
					type: [
						'admin'
					]
				},
				{
					firstName: 'francesca',
					lastName: 'admin',
					userName: 'francesca',
					image: 'String',
					email: 'T.i.p.francesca@outlook.com',
					role: 'admin',
					password: 'Password@1',
					type: [
						'admin'
					]
				}
			];
		},
		TYPE: {}
	},
	CODE: { SUCCESS: 200, NOT_FOUND: 404, SERVER_ERROR: 500, BAD_REQUEST: 400, UNAUTHORIZED: 401 },
	RESPONSE_MESSAGES: {
		SUCCESS: {
			SIGN_UP: 'Registration successful.',
			LOG_IN: 'You have logged in successfully.',
			LOG_OUT: 'You have logged out successfully.',
			PERMISSION_ADDED: 'Permission has been added successfully.',
			PERMISSION_DELETED: 'Permission has been deleted successfully.',
			PERMISSION: 'Permission',
			PERMISSIONS_LIST: 'Permissions list',
			PERMISSIONS_UPDATED: 'Permissions updated',
			OTP_FOR_RESET_PASSWORD: 'OTP to reset password has been sent to your email',
			PASSWORD_UPDATED: 'Password has been updated successfully',
			NO_RECORD_FOUND: 'No record found',

			ROLE_ADDED: 'Role has been added successfully.',
			ROLE_DELETED: 'Role has been deleted successfully.',
			ROLE: 'Role',
			ROLES_LIST: 'Roles list',
			ROLES_UPDATED: 'Role updated',

			USER_DELETED: 'User has been deleted successfully.',
			USER: 'User',
			POKEMON: 'Pokemon',
			USERS_LIST: 'Users list',
			USER_UPDATED: 'User updated',
			POKEMON_LIST: 'Pokemon list'
		},
		FAIL: {
			MISSING_PARAMS: 'Please send all the required parameters.',
			USER_NOT_FOUND: 'User not found',
			INVALID_OTP_EMAIL: 'Invalid OTP or Email',
			WRONG_EMAIL_OR_PASSWORD: 'You have provided wrong email or password',
			REQUEST_NOT_COMPLETED: 'Request not completed, please try again',
			UNAUTHORIZED: 'You are unauthorized, please login and try again'
		},
		OTHERS: {
			FORGOT_EMAIL_SUBJECT: 'FORGOT PASSWORD OTP'
		}
	}
};
