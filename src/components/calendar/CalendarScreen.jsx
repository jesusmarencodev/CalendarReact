import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'moment/locale/es'; //configurando moment en español parte 1
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


//configuracion del calendario
const localizer = momentLocalizer(moment) // or globalizeLocalizer

//configurando moment en ingles parte 2
moment.locale('es');



export const CalendarScreen = () => {

	const dispatch = useDispatch();
	const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'month');
	//TODO : leer los eventos
	const { events, activeEvent } = useSelector(state => state.calendar);

	const { uid } = useSelector(state => state.auth);

	useEffect(()=> {
		dispatch( eventStartLoading() )
	},[ dispatch ])
	

	const onDoubleClick = ( e ) => {
		dispatch( uiOpenModal() );
	} 

	const onSelectEvent = ( e ) => {
		dispatch( eventSetActive( e ) );
	} 

	const onViewChange = ( e ) => {
		setLastView( e )
		localStorage.setItem('lastView', e);
	} 



	const eventStyleGetter = ( event, start, end, isSelected ) => {

		const style = {
			backgroundColor : ( uid === event.user._id ) ? '#367CF7' : '#465660',
			borderRadius : '0px',
			opacity : 0.8,
			display : 'block',
			color : 'white',
		}

		return {
			style
		}
	}

	const onSelectSlot = ( e ) => {
		
		dispatch( eventClearActiveEvent() )
	}

	return (
		<div className="calendar-screen">
			<Navbar />
			<Calendar
				localizer={ localizer }
				events={ events }
				startAccessor="start"
				endAccessor="end"
				messages={ messages }
				eventPropGetter={ eventStyleGetter }
				onDoubleClickEvent={ onDoubleClick }
				onSelectEvent={ onSelectEvent }
				onSelectSlot= { onSelectSlot }
				onView={ onViewChange }
				selectable={ true }
				view={ lastView }
				components={{
					event : CalendarEvent
				}}
			/>

			<AddNewFab/>
			{
				activeEvent &&	<DeleteEventFab/>
			}
			<CalendarModal/>

		</div>
	)
}
