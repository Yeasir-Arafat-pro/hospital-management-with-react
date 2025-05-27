import React from "react";
import "./DoctorLish.css"; // Assuming you have a CSS file for styling
import { useGetDoctorQuery } from "../doctorApi";
import AvailabilityComphonent from "./doctorList/AvailabilityComphonent";
import ActiveComphonent from "./doctorList/activeComphonent";
import PageHeader from "./doctorList/PageHeader";
import Pagination from "../../../Comphonents/Pagination";

const DoctorList = () => {

  
  const {
    data: doctors,
    isLoading,
    error,
  } = useGetDoctorQuery();
  console.log(doctors);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading doctors</p>;

  return (
    <>
      <section className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Department</th>
              <th>Availability</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.payload?.doctors?.map((doctor) => {
              const {
                _id,
                name,
                specialty,
                department,
                availability,
                isActive,
              } = doctor;
              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{specialty}</td>
                  <td>{department.name}</td>
                  <AvailabilityComphonent availability={availability} />
                  <ActiveComphonent isActive={isActive} />
                  <td>
                    <button className="btn-outline">View</button>
                    <button className="btn-outline danger">Deactivate</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination />
      </section>
    </>
  );
};

export default DoctorList;
