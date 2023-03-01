import React, { useState } from 'react'
import { DoubleSidedImage } from 'components/shared'
import { Button } from 'components/ui'
import { storeCompany } from '../../../../services/companyService'
import Loading from "../../../../components/shared/Loading";
import {onSignInSuccess,onCreateCompanySuccess} from "../../../../store/auth/sessionSlice";
import {setCompany} from "../../../../store/auth/companySlice";
import useAuth from 'utils/hooks/useAuth'
import {useDispatch} from 'react-redux'

const Step1 = ({ onNext, onSkip,formData }) => {
const dispatch= useDispatch()
    const [loading,setLoading]=useState(false)
    const {token,authenticated}= useAuth()
    const handleSubmit =()=>{
        setLoading(true)
console.log(formData)
storeCompany(formData).then((res)=>{
    dispatch(setCompany(res.data)) 
   dispatch(onCreateCompanySuccess()) 
    setLoading(false)
})
    }
	return (
        <Loading loading={loading} type="cover">

<div className="text-center">
			<DoubleSidedImage
				className="mx-auto mb-8"
				src="/img/others/welcome.png"
				darkModeSrc="/img/others/welcome-dark.png"
				alt="Welcome"
			/>
			<h3 className="mb-2"></h3>
			{/* <p className="text-base">Telling us a bit about your company to get the best experience, this will only take a minute or two.</p> */}
			<div className="mt-8 max-w-[350px] mx-auto">
				<Button 
					className="mb-2" 
					variant="solid"
					onClick={handleSubmit}
					block
				>
					Create Org Account</Button>
				<Button 
					variant="plain" 
					onClick={onSkip} 
					block
				>
					Skip now
				</Button>
			</div>
		</div>

        </Loading>
		
	)
}

export default Step1