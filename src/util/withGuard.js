import { useSelector } from "react-redux";

const withGuard = (Component) => {
    const Wrapper = (props)=>{
        const {isLoggedin} = useSelector((state) => state.auth)

        return isLoggedin ? <Component {...props}/> : <div>Please logg in first</div>
    }
    return Wrapper;
}

export default withGuard