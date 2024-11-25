import React, { useEffect, useState,useRef ,useCallback} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Popover,Modal,Badge } from "antd";
import "../calendar.css"

import EventDetailCard from './eventDetail';



const localizer = momentLocalizer(moment);


const MyCalendar = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [visible,setVisible]=useState(false);
  const [eventSelected, setEventSelected] = useState([]);
  const [eventDetails,setEventDetails]=useState([]);

  const [eventData,setEventData]=useState([]);

  const [lastEventEnd,setLastEventEnd]=useState(null);

  const selectionBg=useRef(null);

  useEffect(()=>{
    fetch('https://event-calendar-g7s5.onrender.com')
    .then(response=>response.json())
    .then(eventsJson=>{
       
        const groupedEvents = eventsJson.reduce((acc, event) => {
          const key = event.start.toString();
          if (!acc[key]) {
            acc[key] = [];
          }
          event.timing= moment(event.start).format('h:mm A')+` - `+moment(event.end).format('h:mm A')
          event.start=new Date(event.start)
          event.end=new Date(event.end)
          acc[key].push(event);
          return acc;
        }, {});

        const events = Object.values(groupedEvents).map(group => {
          if (group.length > 1) {
            return {
              ...group[0],
              group
            };
          } else {
            return group[0];
          }
        });
        setLastEventEnd(events[events.length - 1].end)
        setEventData(events)
        

    })
    .catch(err=>console.log(err))
  },[])

  const getEventDetails = (eventClicked) => {
    fetch('https://event-calendar-g7s5.onrender.com/'+eventClicked.id)
    .then(response=>response.json())
    .then(eventDet=>{
      setEventDetails([eventDet])
    })
    .catch(err=>console.log(err))
  }


  const renderEventCard=(event) => {
    return (
    <div className='event-card' onClick={() => handleEventClick(event)}> 
 
        <div className='border-left'></div>
        <div className='event-details'>
            <div>
                <span>{event.job_id.jobRequest_Title}</span>
            </div>
            <div>
                <span>{event.desc}</span>
            </div>
            <div>
                <span>Time</span>&nbsp;:&nbsp;<span>{event.timing}</span>
            </div>
        </div>
    
    </div>
    )
    }

    const renderEventCardForPopup=useCallback((event) => {
      return (
      <div ref={selectionBg} className='event-card' onClick={()=>{handlePopupEventClick(event)}}>
          <div className='border-left'></div>
          <div className='event-details'>
              <div>
                  <span>{event.job_id.jobRequest_Title}</span>
              </div>
              <div>
                  <span>{event.desc}</span>
              </div>
              <div>
                  <span>Time</span>&nbsp;:&nbsp;<span>{event.timing}</span>
              </div>
          </div>
      
      </div>
      )
      })



 const handleVisibleChange = useCallback((newVisible) => {
  if(isModalOpen){
    setVisible(true);
  }else{
    setVisible(newVisible);
  }
  });





function Event({ event }) {
 
    return (
      (<>
       {event.group?
       ( 
        <Popover
        content={ <div className='event-list-container'>
            {eventSelected.map((event) => (
                   <>{renderEventCardForPopup(event)}</>
            ))} 
            </div>
        }
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange} 
      >
        <Badge count={event.group.length}>
            {renderEventCardForPopup(event)}
        </Badge>
      </Popover>

       ):(
        <>{renderEventCard(event)}</>
       )
        }
      
      </>)
    );
}

  const handlePopupEventClick=(event)=>{
    setVisible(true);
    if(!event.group){
      setIsModalOpen(true)
     getEventDetails(event)
      selectionBg.current.classList.add("selected-event-custom"); 
    }else{
      setEventSelected(event.group);
    }
  }
  const handleEventClick=(event)=>{
      getEventDetails(event)
      setIsModalOpen(true);
      selectionBg.current.classList.add("selected-event-custom");   
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  });



  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={eventData}
        startAccessor="start"
        endAccessor="end"
        date={lastEventEnd}
        onNavigate={(newDate) => setLastEventEnd(newDate)} 
        // onSelectEvent={handleEventClick}
        views={['month', 'week', 'day']}
        style={{ height: 600 }}
        components={{ event: Event }}
        defaultView="month"
        max={1}
        eventPropGetter={(event) => ({
          style: {},
        })}
      />

     
      <Modal className='event-detail-modal' open={isModalOpen} footer={null}  maskClosable={false} onCancel={closeModal}>
        <div className='event-list-container'>
          {eventDetails.length && <EventDetailCard eventDetails={eventDetails[0]}/>} 

        </div>
      </Modal>
    </div>
  );
};

export default MyCalendar;
