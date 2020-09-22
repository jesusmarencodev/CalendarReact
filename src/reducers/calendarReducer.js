import { types } from '../types/types';

/* {
	_id : '3543543543,
	title : 'Cumpleaños del jefe',
	start : moment().toDate(),
	end   : moment().add(2, 'hours').toDate(),
	bgcolor : '#fafafa',
	notes : 'Comprar paster',
	user : {
		_id : '123',
		name : 'dario'
	}
}	 */

const initialState = { 
	events : [],
	activeEvent : null,
	slots : null
 };

export const calendarReducer = ( state=initialState, action ) => {
	switch (action.type) {
		case types.eventSetActive:
			return {
				...state,
				activeEvent : action.payload
			}
		case types.eventAddNew:
			return {
				...state,
				events : [ 
					...state.events,
					action.payload
				]
			}
		case types.eventClearActiveEvent:
			return {
				...state,
				activeEvent : null
			}
		case types.eventUpdated:
			return {
				...state,
				events : state.events.map(
					e => ( e._id === action.payload._id ) ? action.payload : e
				)
			}
			case types.eventDeleted:
				return {
					...state,
					events : state.events.filter( 
						e => ( e._id !== state.activeEvent._id )
					),
					activeEvent : null
				}
			case types.eventSlot:
				return {
					...state,
					slots : {
						start : action.payload.slots[0],
						end : action.payload.slots[1],
					}
					
				}
			case types.eventLoaded:
				return {
					...state,
					events : [ ...action.payload ]
				}
		
			
	
		default:
			return state
	}
}