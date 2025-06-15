import {useState} from 'react'
import FormWrapper from '../shared/Form/FormWrapper';
const defaultAddress={
    address_no: 0, 
    country: '', region_state: '', city: '', zone: '', woreda_kebele: '', house_no: '', 
    coordinate: '', 
    type_of_address: '', 
    pobox: '', cellphone: '', telephone: '', email: '', fax: '', 
    description: '',
};
const AddressForm = ({country, region_state, city, zone, woreda_kebele, house_no, coordinate, type_of_address, pobox, cellphone, telephone, email, fax, description, updateFields}) => {
    const [address, setAddress]=useState(defaultAddress)
  return (
    <FormWrapper title="Address Detail">
        <label>Type of address</label>
        <input  required type='text' placeholder='Enter country here' value={type_of_address}
                onChange={e=>updateFields({type_of_address: e.target.value})}/>
        <label>Country</label>
        <input  required type='text' placeholder='Enter country here' value={country}
                onChange={e=>updateFields({country: e.target.value})}/>
        <label>Region</label>
        <input  required type='text' placeholder='Enter country here' value={region_state}
                onChange={e=>updateFields({region_state: e.target.value})}/>
        <label>City</label>
        <input  required type='text' placeholder='Enter city here' value={city}
                onChange={e=>updateFields({city: e.target.value})}/>
        <label>Zone</label>
        <input  required type='text' placeholder='Enter city here' value={zone}
                onChange={e=>updateFields({zone: e.target.value})}/>
        <label>Woreda / Kebele</label>
        <input  required type='text' placeholder='Enter city here' value={woreda_kebele}
                onChange={e=>updateFields({woreda_kebele: e.target.value})}/>
        <label>House No</label>
        <input  required type='text' placeholder='Enter city here' value={house_no}
                onChange={e=>updateFields({house_no: e.target.value})}/>                
        <label>P.O.Box</label>
        <input  required type='text' placeholder='Enter location here' value={pobox}
                onChange={e=>updateFields({pobox: e.target.value})}/>
        <label>Telephone</label>
        <input type='text' placeholder='Enter mobile here' value={telephone}
                onChange={e=>updateFields({telephone: e.target.value})}/>
        <label>Mobile No</label>
        <input type='text' placeholder='Enter mobile here' value={cellphone}
                onChange={e=>updateFields({cellphone: e.target.value})}/>
        <label>Fax</label>
        <input type='text' placeholder='Enter mobile here' value={fax}
                onChange={e=>updateFields({fax: e.target.value})}/>
        <label>Email</label>
        <input type='email' placeholder='Enter emial here' value={email}
                onChange={e=>updateFields({email: e.target.value})}/>
        <label>Coordinate</label>
        <input  required type='text' placeholder='Enter country here' value={coordinate}
                onChange={e=>updateFields({coordinate: e.target.value})}/>
        <label>Description</label>
        <input  required type='text' placeholder='Enter country here' value={description}
                onChange={e=>updateFields({description: e.target.value})}/>
    </FormWrapper>
  )
}

export default AddressForm