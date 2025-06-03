import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Error from './pages/Error';
import MainLayout from './layouts/MainLayout';
import PatientForm from './features/patients/comphonents/PatientForm';
import PatientList from './features/patients/comphonents/PatientList';
import DoctorList from './features/doctors/comphonents/DoctorList';
import DoctorForm from './features/doctors/comphonents/DoctorForm';
import AppointmentList from './features/appointments/comphonents/AppointmentList';
import DepartmentList from './features/departments/comphonents/DepartmentList';
import DepartmentForm from './features/departments/comphonents/DepartmentForm';
import MedicalRecordsList from './features/medicalRecords/comphonents/MedicalRecordsList';
import MedicalRecordForm from './features/medicalRecords/comphonents/MedicalRecordForm';
import RoomForm from './features/rooms/comphonents/RoomForm';
import RoomList from './features/rooms/comphonents/RoomList';
import BillingList from './features/billings/comphonents/BillingList';
import BillingForm from './features/billings/comphonents/BillingForm';
import PatientDetail from './features/patients/comphonents/PatientDetail';
import UsersTable from './features/auth/comphonents/UsersTable';
import RoomUpdate from './features/rooms/comphonents/RoomUpdate';
import RoomDetail from './features/rooms/comphonents/RoomDetail';
import FormikContainer from './Comphonents/Formik/FormikContainer';
import Login from './features/auth/comphonents/Login';
import DoctorDetail from './features/doctors/comphonents/DoctorDetail';
import Home from './pages/Home';

const App = () => {
   const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <MainLayout />,
          children: [
            {path: '/', element: <Home />},
            {path: '/form-test', element: <FormikContainer />},
            {path: '/users', element: <UsersTable />},
            {path: '/login', element: <Login />},
            {path: '/patients/create', element: <PatientForm />},
            {path: '/patients/edit/:id', element: <PatientForm />},
            {path: '/patients/details/:id', element: <PatientDetail />},
            {path: '/patients', element: <PatientList />},
            {path: '/doctors/:id', element: <DoctorDetail />},
            {path: '/doctors', element: <DoctorList />},
            {path: '/doctors/create', element: <DoctorForm />},
            {path: '/appointments', element: <AppointmentList />},
            {path: '/departments', element: <DepartmentList />},
            {path: '/departments/create', element: <DepartmentForm />},
            {path: '/billing', element: <BillingList />},
            {path: '/billing/edit/:id', element: <BillingForm />},
            {path: '/billing/create', element: <BillingForm />},
            {path: '/medicalRecords', element: <MedicalRecordsList />},
            {path: '/medicalRecords/create', element: <MedicalRecordForm />},
            {path: '/rooms', element: <RoomList />},
            {path: '/rooms/create', element: <RoomForm />},
            {path: '/rooms/update', element: <RoomUpdate />},
            {path: '/rooms/detail', element: <RoomDetail />},
          ],
        },

      ],
    },
  ]);
  

  return (
    <div>

        <RouterProvider router={router} />

    </div>
  );
}


export default App