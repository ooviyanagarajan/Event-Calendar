
const EventDetailCard=({eventDetails})=>{
    let {jobRequest_Role,jobRequest_Title,jobRequest_TotalVacancy}=eventDetails.job_id;
    let {candidate_firstName,candidate_lastName,candidate_email}=eventDetails.user_det.candidate;
    let {userEmail,username}=eventDetails.user_det.handled_by;
   return (
    <div className='event-details-modal'>
    <div className='detail-card summary'>
    <div className='card-title'>Event Summary</div>
    <div>
      <span>Id</span>:<span>{eventDetails.id || ``}</span>
    </div>
    <div>
      <span>Summary</span>  : <span>{eventDetails.summary}</span>
    </div>

      </div>
    <div className='detail-card job-desc'>
      <div className='card-title'>Job Info</div>
      <div>
        <span>Job Title</span> :<span>{jobRequest_Role}</span>
      </div>
      <div>
        <span>Job Role</span> :  <span>{jobRequest_Title}</span>
      </div>
      <div>
        <span>Total Vacancy</span>: <span>{jobRequest_TotalVacancy}</span>
      </div>
    </div>
  
    <div className='detail-card candidate-info'>
    <div className='card-title'>Candidate Info</div>
    <div>
      <span>Candidate Name</span> : <span>{candidate_firstName + '&nbsp;'+ candidate_lastName}</span>
    </div>
    <div>
      <span>Candidate Email</span> :  <span>{candidate_email}</span>
    </div>
    </div>
    <div className='detail-card hr-info'>
      <div className='card-title'>HR Details</div>
    <div>
      <span>HR Name</span> : <span>{username}</span>
    </div>
    <div>
      <span>HR Email</span> : <span>{userEmail}</span>
    </div>
    </div>

    </div>
   )

  }

  export default EventDetailCard