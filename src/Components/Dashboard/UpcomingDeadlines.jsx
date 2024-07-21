import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import StatusCell from '../Projects/StatusCell';
import './UpcomingDeadlines.css';

function UpcomingDeadlines() {
  const { user } = useContext(UserContext);

  return (
    <div className='upcoming'>
      <h2 className='upcoming-header'><i className='bx bxs-calendar'></i> Upcoming Deadlines</h2>
      <div className="sub-contain">
        {user.upcomingDues().length === 0 ? (
          <div className="no-due">
            <h1 className='bxh1'><i className='bx bx-badge-check'></i></h1>
            <h2 className='no-upcoming-text'>All Good!</h2>
          </div>
        ) : (
          user.upcomingDues().map((due, index) => (
            <div className="due" key={index}>
              <div className="due-info">
                <div className="due-title">{due.title}</div>
                <div className="due-dueDate">Due: {due.dueDate}</div>
              </div>
              <StatusCell status={due.toDo.getStatus()} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UpcomingDeadlines;
