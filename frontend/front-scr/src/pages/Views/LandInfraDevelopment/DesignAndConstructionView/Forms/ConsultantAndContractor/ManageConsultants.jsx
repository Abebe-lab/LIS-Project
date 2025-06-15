import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RegisterContractor.css";
import { GetDataFromApiWithParams,DeleteAndGetResponse, UpdateAndGetResponse } from "../../../../../../services/api/ExecuteApiRequests";

const ManageConsultants = () => {
  const [consultants, setConsultants] = useState([]);
  const [editingConsultant, setEditingConsultant] = useState(null);
  
  const fetchConsultants = async () => {
    try {
      const responseData = await GetDataFromApiWithParams('consultants');
      setConsultants(responseData);
    } catch (error) {
      console.error("Error fetching consultants:", error);
    }
  };

  useEffect(() => {    
    fetchConsultants();
  }, []);

   const handleEdit = (consultant) => {
    setEditingConsultant(consultant);
  };

  const handleDelete = async (id) => {
    try {
      await DeleteAndGetResponse(`consultants/${id}`);
      fetchConsultants();
    } catch (error) {
      console.error("Error deleting consultant:", error);
    }
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    try {
      await UpdateAndGetResponse(`/consultants/${editingConsultant.id}`, {
        name: editingConsultant.name,
        cls: editingConsultant.cls,
        license_no: editingConsultant.license_no,
        tin_no: editingConsultant.tin_no,
        origin_country: editingConsultant.origin_country,
        address_region: editingConsultant.address_region,
        address_city: editingConsultant.address_city,
        address_subcity: editingConsultant.address_subcity,
        address_woreda: editingConsultant.address_woreda,
        address_house_no: editingConsultant.address_house_no,
        contact_person_name: editingConsultant.contact_person_name,
        telephone: editingConsultant.telephone,
        email: editingConsultant.email,
        description: editingConsultant.description,
        id: editingConsultant.id,
      });
      setEditingConsultant(null);
      fetchConsultants();
    } catch (error) {
      console.error("Error updating consultant:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingConsultant(null);
  };

  return (
    <div className="consultant-management-container">
      <h2>Manage Consultants</h2>
      <h3><Link to="/registerConsultant" style={{ marginLeft: '10px' }}>
          New Consultant
        </Link></h3>
      <table className="consultant-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Class</th>
            <th>License No</th>
            <th>TIN No</th>
            <th>Origin Country</th>
            <th>Address Region</th>
            <th>City</th>
            <th>Sub-City</th>
            <th>Woreda</th>
            <th>House No</th>
            <th>Contact Person</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {consultants.map((consultant) => (
            <tr key={consultant.id}>
              <td>{consultant.id}</td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.name}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.name
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <select
                    value={editingConsultant.cls}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        cls: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                ) : (
                  consultant.cls
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.license_no}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        license_no: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.license_no
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.tin_no}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        tin_no: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.tin_no
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <select
                    value={editingConsultant.origin_country}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        origin_country: e.target.value,
                      })
                    }
                  >
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="United States">United States</option>
                    {/* ... other countries ... */}
                  </select>
                ) : (
                  consultant.origin_country
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.address_region}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        address_region: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.address_region
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.address_city}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        address_city: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.address_city
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.address_subcity}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        address_subcity: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.address_subcity
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.address_woreda}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        address_woreda: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.address_woreda
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.address_house_no}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        address_house_no: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.address_house_no
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.contact_person_name}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        contact_person_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.contact_person_name
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.telephone}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        telephone: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.telephone
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <input
                    type="text"
                    value={editingConsultant.email}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.email
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <textarea
                    value={editingConsultant.description}
                    onChange={(e) =>
                      setEditingConsultant({
                        ...editingConsultant,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  consultant.description
                )}
              </td>
              <td>
                {editingConsultant && editingConsultant.id === consultant.id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(consultant)}>Edit</button>
                    <button onClick={() => handleDelete(consultant.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageConsultants;
