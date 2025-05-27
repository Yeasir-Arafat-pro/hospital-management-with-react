import React from 'react'

const ExpendedTr = ({patient}) => {
  return (
                      <tr className="expanded-row">
                        <td colSpan={8}>
                          <div className="expanded-content">
                            <div className="patient-detail">
                              <h4>Patient Details</h4>
                              <div className="detail-grid">
                                <div>
                                  <strong>Name:</strong>{" "}
                                  { patient?.name}
                                </div>
                                <div>
                                  <strong>Age:</strong> { patient?.age}
                                </div>
                                <div>
                                  <strong>Gender:</strong>{" "}
                                  { patient?.gender}
                                </div>
                                <div>
                                  <strong>Phone:</strong>{" "}
                                  { patient?.contact.phone}
                                </div>
                                <div>
                                  <strong>Email:</strong>{" "}
                                  { patient?.contact.email}
                                </div>
                                <div className="full-width">
                                  <strong>Address:</strong>{" "}
                                  { patient?.address.street},{" "}
                                  { patient?.address.city},{" "}
                                  { patient?.address.postalCode},{" "}
                                  { patient?.address.country}
                                </div>
                                <div className="full-width">
                                  <strong>Emergency Contact:</strong>{" "}
                                  { patient?.emergencyContact.name} (
                                  <em>
                                    {
                                       patient?.emergencyContact
                                        .relation
                                    }
                                  </em>
                                  ) — { patient?.emergencyContact.phone}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
  )
}

export default ExpendedTr