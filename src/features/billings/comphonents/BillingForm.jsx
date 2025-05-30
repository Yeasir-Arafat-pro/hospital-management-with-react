import React, { use, useEffect, useMemo } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import Select from "react-select";

import "./BillingForm.css";
import FormikControl from "../../../Comphonents/Formik/FormikControl";
import { useGetPatientQuery } from "../../patients/patientsApi";
import { useGetAppointmentQuery } from "../../appointments/appointmentApi";
import { useAddBillingMutation } from "../billingApi";

const PatientObserver = ({ onChange }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    onChange(values.patient);
  }, [values.patient, onChange]);
  return null;
};

const BillingForm = () => {
  const [addBilling] =useAddBillingMutation()
  const [patientId, setPatientId] = React.useState("");
  
  const initialValues = {
    invoiceNo: "",
    patient: "", // or null
    appointment: "",
    lineItems: [{ description: "", amount: "", quantity: 1 }],
    taxPercent: 0,
    discountAmount: 0,
    paymentMethod: "cash",
    status: "pending",
  };

  const validationSchema = Yup.object({
    invoiceNo: Yup.string()
      .min(2, "Invoice No. must be at least 2 characters")
      .required("Invoice No. is required"),
    patient: Yup.string().required("Patient is required"),
  });

  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);

   const result = await addBilling(values)
   console.log(result);
   
    
    // Here you would typically dispatch an action to save the billing data
    // For example: await addBilling(values);
  };

  const { data, isLoading, isError } = useGetPatientQuery();
  const { data: appointments } = useGetAppointmentQuery(
    patientId
  );
  const patients = useMemo(() => data?.payload?.patients ?? [], [data]);
  const appoints = useMemo(
    () => appointments?.payload?.appointments ?? [],
    [appointments]
  );

  const options = patients.map((patient) => ({
    value: patient._id,
    label: `${patient.name} (${patient.contact?.phone})`,
  }));

  const AppointOptions = appoints.map((appointment) => ({
    value: appointment._id,
    label: `${appointment.datetime}`,
  }));

  const paymentOptions = [
    { key: "Cash", value: "cash" },
    { key: "Card", value: "card" },
    { key: "Insurance", value: "insurance" },
    { key: "Online", value: "online" },
  ];

  const statusOptions = [
    { key: "Pending", value: "pending" },
    { key: "Paid", value: "Paid" },
    { key: "Cancelled", value: "cancelled" },
  ];

  return (
    <>
      <section className="form-container">
        <h2>Billing Form</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isValid, isSubmitting, dirty, values }) => {

            return (
              <Form id="billing-form" className="grid-form">
                <FormikControl
                  control="input"
                  label="Invoice No."
                  type="text"
                  name="invoiceNo"
                  placeholder="INV-00123"
                />

                <FormikControl
                  control="search"
                  label="Patient"
                  name="patient"
                  placeholder="Select Patient"
                  options={options}
                  
                />

                <PatientObserver onChange={setPatientId} />

                <FormikControl
                  control="search"
                  label="Appointment"
                  name="appointment"
                  placeholder="Select Appointment"
                  options={AppointOptions}
                />

                <fieldset className="fieldset grid-fieldset">
                  <legend>Line Items</legend>

                  <FormikControl
                    control="input"
                    label="Description"
                    type="text"
                    name="lineItems[0].description"
                    placeholder="Consultation fee"
                  />

                  <FormikControl
                    control="input"
                    label="Amount"
                    type="numbeer"
                    name="lineItems[0].amount"
                    placeholder="$100"
                    step="0.01"
                  />

                  <FormikControl
                    control="input"
                    label="Quantity"
                    type="number"
                    name="lineItems[0].quantity"
                    min="1"
                  />
                </fieldset>

                <FormikControl
                  control="input"
                  label="Tax %"
                  type="number"
                  name="taxPercent"
                  min="0"
                  max="100"
                />

                <FormikControl
                  control="input"
                  label="Discount"
                  type="number"
                  name="discountAmount"
                  min="0"
                  step="0.01"
                />

                <FormikControl
                  control="select"
                  label="Payment Method"
                  name="paymentMethod"
                  options={paymentOptions}
                />

                <FormikControl
                  control="select"
                  label="Status"
                  name="status"
                  options={statusOptions}
                />

                <div className="totals">
                  <div>
                    Sub‑Total: <span id="displaySubTotal">$0.00</span>
                  </div>
                  <div>
                    Tax Amount: <span id="displayTaxAmount">$0.00</span>
                  </div>
                  <div>
                    Discount: <span id="displayDiscount">$0.00</span>
                  </div>
                  <div>
                    <strong>
                      Total: <span id="displayTotal">$0.00</span>
                    </strong>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="reset" className="btn-outline">
                    Reset
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Billing
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </>
  );
};

export default BillingForm;
