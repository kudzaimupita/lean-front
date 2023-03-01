import React, { useState, useCallback,  Suspense, lazy } from 'react'
import { Container } from 'components/shared'
import useAuth from 'utils/hooks/useAuth'
import{useNavigate} from 'react-router-dom'
import Header from 'components/template/Header'
import UserDropdown from 'components/template/UserDropdown'
import HeaderLogo from 'components/template/HeaderLogo'
import Search from 'components/template/Search'
import MobileNav from 'components/template/MobileNav'
import HorizontalNav from 'components/template/HorizontalNav'
import View from 'views'

const HeaderActionsStart = () => {
	return (
		<>
			<HeaderLogo />
		</>
	)
}

const Step1 = lazy(() => import('./components/Step1'))
const Step2 = lazy(() => import('./components/Step2'))
const Step3 = lazy(() => import('./components/Step3'))
const Step5 = lazy(() => import('./components/Step5'))
const Step4 = lazy(() => import('./components/Step4'))
const Step6 = lazy(() => import('./components/Step6'))
const QuickStart = lazy(() => import('./components/QuickStart'))

const Welcome = () => {
const {token,authenticated}= useAuth()
const [formData, setFormData] = useState({})
// useState

// if(!token && !authenticated){
// 	navigate('/signin')
// }
const HeaderActionsEnd = () => {
	return (
		<>
			{/* <Search />
			<LanguageSelector />
			<Notification />
			<SidePanel /> */}
			<UserDropdown hideOtherActions={true} />
		</>
	)
}
	const [surveyStep, setSurveyStep] = useState(0)

	const handleNext = useCallback( (values) => {

		setSurveyStep(surveyStep + 1)
		values?.type!=='click' && setFormData({...formData,...values})
		console.log(formData)
		
	}, [surveyStep])
	console.log(formData)
	const handleBack = useCallback( () => {
		setSurveyStep(surveyStep - 1)
	}, [surveyStep])

	const handleSkip = () => {
		setSurveyStep(4)
	}
	
	return (
		<div className="app-layout-simple flex flex-auto flex-col min-h-screen">
			<div className="flex flex-auto min-w-0">
				<div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
					<Header
						container
						className="shadow dark:shadow-2xl"
						headerStart={<HeaderActionsStart />}
						// headerMiddle={<HorizontalNav />}
						headerEnd={<HeaderActionsEnd />} 
					/>
							<Container className="h-full">
			<div className="h-full flex flex-col items-center justify-center">
				<Suspense fallback={<></>}>
					{ surveyStep === 0 && <Step1 onNext={handleNext} onSkip={handleSkip} /> }
					{ surveyStep === 1 && <Step3 onNext={handleNext} onBack={handleBack} /> }
					{ surveyStep === 2 && <Step2 onNext={handleNext} onBack={handleBack} /> }
				
					{ surveyStep === 3 && <Step5 onNext={handleNext} onBack={handleBack} /> }
					{ surveyStep === 4 && <Step4 onNext={handleNext} onBack={handleBack}/> }
					{ surveyStep === 5 && <Step6 formData={formData}/> }
				</Suspense>
			</div>
		</Container>
				</div>
			</div>
		</div>

	)
}

export default Welcome