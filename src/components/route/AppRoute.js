import React, { useEffect, useCallback } from 'react'
import { setLayout, setPreviousLayout } from 'store/theme/themeSlice'
import { setCurrentRouteKey } from 'store/base/commonSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation,useNavigate} from 'react-router-dom'
import useAuth from 'utils/hooks/useAuth'
const AppRoute = ({ component: Component, routeKey, ...props }) => {

	const location = useLocation()
const navigate= useNavigate()
	const dispatch = useDispatch()
const {token,authenticated}=useAuth()
	const layoutType = useSelector((state) => state.theme.layout.type)
	const previousLayout = useSelector((state) => state.theme.layout.previousType)

	const handleLayoutChange = useCallback(() => {
		// console.log(token,routeKey)
		if(!authenticated&&  token && routeKey!=='welcome'){
         navigate('/welcome')
		}
		console.log(!token && !authenticated && routeKey==='welcome')
		if(!token && !authenticated && routeKey==='welcome'){
			navigate('/signin')
		}
	
		dispatch(setCurrentRouteKey(routeKey))

		if (props.layout && props.layout !== layoutType) {
			dispatch(setPreviousLayout(layoutType))
			dispatch(setLayout(props.layout))
		}

		if (!props.layout && previousLayout && layoutType !== previousLayout) {
			dispatch(setLayout(previousLayout))
			dispatch(setPreviousLayout(''))
		}
	}, [dispatch, layoutType, previousLayout, props.layout, routeKey])

	useEffect(() => {
	
			handleLayoutChange()
		   

	}, [location, handleLayoutChange])
	
	
	return (
		<Component {...props} />
	)
}

export default AppRoute