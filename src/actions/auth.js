import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";


export const startLogin = ( email, password ) => {
	return async( dispatch ) => {
		const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
		const body = await resp.json();

		if( body.ok ){
			localStorage.setItem('token', body.token );
			localStorage.setItem('token-init-date', new Date().getTime() );
			dispatch( login({ uid : body.uid, name : body.name }) )
		}else{
			Swal.fire('Error', body.msg, 'error');
		}
	}
}

export const startRegister = (name, email, password ) => {
	
	return async( dispatch ) => {
		const resp = await fetchSinToken( 'auth/new', { name, email, password }, 'POST' );
		const body = await resp.json();

		if( body.ok ){
			localStorage.setItem('token', body.token );
			localStorage.setItem('token-init-date', new Date().getTime() );

			dispatch( login({ uid : body.uid, name : body.name }) )
		}else{
			Swal.fire('Error', body.msg, 'error');
		}
	}
}

export const startCheckingToken = () => {
	return async( dispatch ) => {
		const resp = await fetchConToken( 'auth/renew' );
		const body = await resp.json();


		if( body.ok ){
			localStorage.setItem('token', body.token );
			localStorage.setItem('token-init-date', new Date().getTime() );
			dispatch( login({ uid : body.uid, name : body.name }) )
		}else{
			Swal.fire('Error', body.msg, 'error');
			dispatch( checkingFinish() )
		}
	}
}

const checkingFinish = ( ) =>({	type : types.authCheckingFinish });

//esta accion sirve tanto para el login como el register
const login = ( user ) =>({
	type : types.authLogin,
	payload : user
});

export const starLogout = () => {
	return async ( dispatch ) => {
		localStorage.clear();

		dispatch( logout() )
	}
}

const logout = () => ({ type: types.authLogout });




