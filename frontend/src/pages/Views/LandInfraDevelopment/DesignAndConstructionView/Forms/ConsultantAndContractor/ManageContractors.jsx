import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RegisterContractor.css";
import { DeleteAndGetResponse, ExecuteApiToPost, GetDataFromApiWithParams } from "../../../../../../services/api/ExecuteApiRequests";

const ManageContractors = () => {
  const [contractors, setContractors] = useState([]);
  const [editingContractor, setEditingContractor] = useState(null);
  
  const fetchContractors = async () => {
    try {
      const responseData = await GetDataFromApiWithParams('contractors');
      setContractors(responseData);
    } catch (error) {
      console.error("Error fetching contractors:", error);
    }
  };

  useEffect(() => {    
    fetchContractors();
  }, []);

   const handleEdit = (contractor) => {
    setEditingContractor(contractor);
  };

  const handleDelete = async (id) => {
    try {
      await DeleteAndGetResponse(`contractors/${id}`);
      fetchContractors();
    } catch (error) {
      console.error("Error deleting contractor:", error);
    }
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    try {
      await ExecuteApiToPost(`contractors/${editingContractor.id}`, {
        name: editingContractor.name,
        cls: editingContractor.cls,
        license_no: editingContractor.license_no,
        tin_no: editingContractor.tin_no,
        origin_country: editingContractor.origin_country,
        address_region: editingContractor.address_region,
        address_city: editingContractor.address_city,
        address_subcity: editingContractor.address_subcity,
        address_woreda: editingContractor.address_woreda,
        address_house_no: editingContractor.address_house_no,
        contact_person_name: editingContractor.contact_person_name,
        telephone: editingContractor.telephone,
        email: editingContractor.email,
        description: editingContractor.description,
        id: editingContractor.id,
      });
      setEditingContractor(null);
      fetchContractors();
    } catch (error) {
      console.error("Error updating contractor:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingContractor(null);
  };

  return (
    <div className="consultant-management-container">
      <h2>Manage Contractors</h2>
      <h3><Link to="/registerContractor" style={{ marginLeft: '10px' }}>
          New Contractor
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
          {contractors.map((contractor) => (
            <tr key={contractor.id}>
              <td>{contractor.id}</td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.name}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.name
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <select
                    value={editingContractor.cls}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
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
                  contractor.cls
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.license_no}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        license_no: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.license_no
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.tin_no}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        tin_no: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.tin_no
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <select
                    value={editingContractor.origin_country}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        origin_country: e.target.value,
                      })
                    }
                  >
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="United States">United States</option>
                    {/* ... other countries ... */}
                  </select>
                ) : (
                  contractor.origin_country
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.address_region}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        address_region: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.address_region
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.address_city}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        address_city: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.address_city
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.address_subcity}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        address_subcity: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.address_subcity
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.address_woreda}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        address_woreda: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.address_woreda
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.address_house_no}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        address_house_no: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.address_house_no
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.contact_person_name}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        contact_person_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.contact_person_name
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.telephone}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        telephone: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.telephone
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <input
                    type="text"
                    value={editingContractor.email}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.email
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <textarea
                    value={editingContractor.description}
                    onChange={(e) =>
                      setEditingContractor({
                        ...editingContractor,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  contractor.description
                )}
              </td>
              <td>
                {editingContractor && editingContractor.id === contractor.id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(contractor)}>Edit</button>
                    <button onClick={() => handleDelete(contractor.id)}>
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

export default ManageContractors;
