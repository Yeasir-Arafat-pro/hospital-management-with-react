import React from "react";
import "./RoomDetail.css";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

const RoomDetail = () => {
  const { state } = useLocation();

  return (
    <section class="details-container">
      <h1>Room Details</h1>
      <div class="details-card">
        <div class="card-row">
          <div class="card-group">
            <h3>Ward</h3>
            <p id="detail-ward">{state.ward}</p>
          </div>
          <div class="card-group">
            <h3>Room No.</h3>
            <p id="detail-room">{state.roomNumber}</p>
          </div>
          <div class="card-group">
            <h3>Bed No.</h3>
            <p id="detail-bed">{state.bedNumber}</p>
          </div>
        </div>
        <div class="card-row">
          <div class="card-group">
            <h3>Status</h3>
            <p id="detail-status">
              {state.isAvailable ? (
                <span class="status-badge available">Available</span>
              ) : (
                <span class="status-badge occupied">Occupied</span>
              )}
            </p>
          </div>
          <div class="card-group">
            <h3>Patient</h3>
            <p id="detail-patient">
                {
                    state.patient 
                    ? <span>{state.patient.name}</span>
                    : '—'
                }
            </p>
          </div>
          <div class="card-group">
            <h3>Admitted At</h3>
            <p id="detail-admitted">
                {
                    state.admittedAt 
                    ? <span>{format(new Date(state.admittedAt), "dd MMM yyyy")}</span>
                    : '—'
                }
            </p>
          </div>
        </div>
        <div class="card-row">
          <div class="card-group">
            <h3>Discharged At</h3>
            <p id="detail-discharged">—</p>
          </div>
          <div class="card-group">
            <h3>Notes</h3>
            <p id="detail-notes">No notes.</p>
          </div>
          <div class="card-group"></div>
        </div>
        <div class="actions-row">
          <button class="btn-outline">Edit</button>
          <button class="btn-secondary">Back to List</button>
        </div>
      </div>
    </section>
  );
};

export default RoomDetail;
