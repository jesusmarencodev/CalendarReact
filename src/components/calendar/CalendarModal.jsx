import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import {eventClearActiveEvent, eventsStartUpdate, eventstartAddNew } from '../../actions/events';



const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, "hours");// 6:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
	title : '',
	notes : '',
	start : now.toDate(),
	end   : nowPlus1.toDate()
}


export const CalendarModal = ( ) => {

	const [ dateStart, setDateStart ] = useState(now.toDate());
	const [ dateEnd, setDateEnd ] = useState(nowPlus1.toDate());
	const [titleValid, setTitleValid] = useState(true);

	const { modalOpen   } = useSelector( state => state.ui );
	const { activeEvent } = useSelector( state => state.calendar );
	const dispatch = useDispatch();

	const [ formValues, setFormValues ] = useState( initEvent );

	const  { title, notes, start, end } = formValues;

	useEffect(() => {
		if( activeEvent ){
			setFormValues( activeEvent );
		}
	}, [ activeEvent, setFormValues ])

	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name] : target.value
		});
	}




	const closeModal = () => {
		//TODO cerrar modal
		dispatch( uiCloseModal() );
		dispatch( eventClearActiveEvent() );
		setFormValues( initEvent );
	}


	const handleStartDateChangge = ( e ) => {
		setDateStart( e );
		setFormValues({
			...formValues,
			start : e
		});
	}

	const handleEndDateChange = ( e ) => {
		setDateEnd( e );
		setFormValues({
			...formValues,
			end : e
		});
	}

	const handleSubmitForm = ( e ) => {
		e.preventDefault();

		const momentStart = moment( start );
		const momentEnd   = moment( end );

		if(momentStart.isSameOrAfter( momentEnd )){
			console.log('fecha 2 debe de ser mayor');
			Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');

			return;
		}

		if( title.trim().length < 2 ){
			console.log('invalido')
			setTitleValid(false);

			return;
		}

		//TODO: realizar grabacion

		//si activeEvent no es null quiere decir que se trata de una edicion
		if( activeEvent ){
			dispatch( eventsStartUpdate( formValues ) );
		}else{
			//sino quiere decir que es un evento nuevo
			dispatch( eventstartAddNew({ ...formValues }));
		}


		setTitleValid(true);
		closeModal();

	}

	return (
		<Modal
			isOpen={ modalOpen }
			//onAfterOpen={afterOpenModal}
			onRequestClose={ closeModal }
			style={ customStyles }
			className='modal'
			overlayClassName='modal-fondo'
			closeTimeoutMS={ 200 }
		>
			<h1>
				{
					!activeEvent ? 'Nuevo Evento' : 'Editar Evento'
				}

			</h1>
			<hr />
			<form
				className="container"
				onSubmit={ handleSubmitForm }
			>

					<div className="form-group">
							<label>Fecha y hora inicio</label>
							<DateTimePicker
								className='form-control'
								onChange={ handleStartDateChangge }
								value={ dateStart }
							/>
					</div>

					<div className="form-group">
							<label>Fecha y hora fin</label>
							<DateTimePicker
								className='form-control'
								onChange={ handleEndDateChange }
								minDate={ dateStart }
								value={ dateEnd }
							/>
					</div>

					<hr />
					<div className="form-group">
							<label>Titulo y notas</label>
							<input 
									type="text" 
									className={ `form-control ${ titleValid ? 'is-valid' : 'is-invalid' }` }
									placeholder="Título del evento"
									name="title"
									value={ title }
									onChange={ handleInputChange }
									autoComplete="off"
							/>
							<small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
					</div>

					<div className="form-group">
							<textarea 
									type="text" 
									className="form-control"
									placeholder="Notas"
									rows="5"
									name="notes"
									value={ notes }
									onChange={ handleInputChange }
							></textarea>
							<small id="emailHelp" className="form-text text-muted">Información adicional</small>
					</div>

					<button
							type="submit"
							className="btn btn-outline-primary btn-block"
					>
							<i className="far fa-save"></i>
							<span> Guardar</span>
					</button>

			</form>
		</Modal>
	)
}
