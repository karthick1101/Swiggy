import errorImg from '../../images/cato.jpg'
import {useRouteError} from 'react-router-dom'

const Error=()=>{
    const err=useRouteError();
    return(
        <>
        <h1>Oops!!!</h1>
        <h2>Something Went Wrong!!!</h2>
        <h3>{err.status}</h3>
        <img src={errorImg}></img>
        </>
    );
}
export default Error