// src/routes/AppRouter.jsx

// import React from 'react';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from 'react-router-dom';

// import MainLayout from '../layouts/MainLayout';
// import AuthLayout from '../layouts/AuthLayout';

// import Login from '../features/auth/components/Login';
// import Register from '../features/auth/components/Register';

// import PatientList from '../features/patients/comphonents/PatientList';
//import PatientForm from '../features/patients/components/PatientForm';

// import DepartmentList from '../features/departments/components/DepartmentList';
// import DepartmentForm from '../features/departments/components/DepartmentForm';

// import DoctorList from '../features/doctors/components/DoctorList';
// import DoctorForm from '../features/doctors/components/DoctorForm';

// import AppointmentList from '../features/appointments/components/AppointmentList';
// import AppointmentForm from '../features/appointments/components/AppointmentForm';

// import BillingList from '../features/billing/components/BillingList';
// import BillingForm from '../features/billing/components/BillingForm';

// import RecordList from '../features/medicalRecords/components/RecordList';
// import RecordForm from '../features/medicalRecords/components/RecordForm';

// import RoomList from '../features/rooms/components/RoomList';
// import RoomForm from '../features/rooms/components/RoomForm';

//import PrivateRoute from '../utils/PrivateRoute';

// const router = createBrowserRouter([
//   {

    // element: <AuthLayout />,
    // children: [
    //   { path: '/login', element: <Login /> },
    //   { path: '/register', element: <Register /> },
//     ]
//   },
//   {
//     element: <PrivateRoute><MainLayout /></PrivateRoute>,
//     children: [
//       { path: '/', element: <Navigate to="/patients" replace /> },

//       {
//         path: 'patients',
//         children: [
//           { index: true, element: <PatientList /> },
//           { path: 'new', element: <PatientForm /> },
//           { path: ':id', element: <PatientForm /> },
//         ]
//       },
    //   {
    //     path: 'departments',
    //     children: [
    //       { index: true, element: <DepartmentList /> },
    //       { path: 'new', element: <DepartmentForm /> },
    //       { path: ':id', element: <DepartmentForm /> },
    //     ]
    //   },
    //   {
    //     path: 'doctors',
    //     children: [
    //       { index: true, element: <DoctorList /> },
    //       { path: 'new', element: <DoctorForm /> },
    //       { path: ':id', element: <DoctorForm /> },
    //     ]
    //   },
    //   {
    //     path: 'appointments',
    //     children: [
    //       { index: true, element: <AppointmentList /> },
    //       { path: 'new', element: <AppointmentForm /> },
    //       { path: ':id', element: <AppointmentForm /> },
    //     ]
    //   },
    //   {
    //     path: 'billing',
    //     children: [
    //       { index: true, element: <BillingList /> },
    //       { path: 'new', element: <BillingForm /> },
    //       { path: ':id', element: <BillingForm /> },
    //     ]
    //   },
    //   {
    //     path: 'records',
    //     children: [
    //       { index: true, element: <RecordList /> },
    //       { path: 'new', element: <RecordForm /> },
    //       { path: ':id', element: <RecordForm /> },
    //     ]
    //   },
    //   {
    //     path: 'rooms',
    //     children: [
    //       { index: true, element: <RoomList /> },
    //       { path: 'new', element: <RoomForm /> },
    //       { path: ':id', element: <RoomForm /> },
    //     ]
    //   },

    //   // Catch-all
    //   { path: '*', element: <Navigate to="/" replace /> },
//     ]
//   }
// ]);

// export default function AppRouter() {
//   return <RouterProvider router={router} />;
// }


