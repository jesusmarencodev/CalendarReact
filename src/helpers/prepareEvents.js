import moment from 'moment';

export const prepareEvenst = ( events=[] ) => {

	return events.map((e) => {
		return {
			...e,
			end : moment(e.end).toDate(),
			start : moment(e.start).toDate()
		}
	});

	//o mas corto
/* 	return events.map(
		( e ) =>({
			...e,
			end : moment( e.end ).toDate(),
			start : moment( e.start ).toDate()
		})
	) */


}