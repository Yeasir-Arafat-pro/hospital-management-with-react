
import { configureStore } from '@reduxjs/toolkit';

import  { patientsApi } from '../features/patients/patientsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { doctorApi } from '../features/doctors/doctorApi';
import { userApi } from '../features/auth/usersApi';
import { departmentApi } from '../features/departments/departmentApi';
import { roomApi } from '../features/rooms/roomApi';
import { appointmentApi } from '../features/appointments/appointmentApi';



export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [patientsApi.reducerPath]: patientsApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(patientsApi.middleware, doctorApi.middleware, userApi.middleware, departmentApi.middleware, roomApi.middleware, appointmentApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
export default store;