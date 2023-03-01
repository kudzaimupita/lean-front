import React from 'react'
import SignUpForm from './SignUpForm'

const SignUp = () => {
	return (
		<>
			<div className="mb-8">
				<h3 className="mb-1">Enter password</h3>
				<p>Let's get you started with the free trial</p>
			</div>
			<SignUpForm disableSubmit={false} />
		</>
		
	)
}

export default SignUp