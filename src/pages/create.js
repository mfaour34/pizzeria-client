import { Autocomplete, Grid, TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from 'axios';

async function fetch(setData) {
    try {
        let fetch = await axios.get('http://127.0.0.1:3333/api/v1/pizza', { headers: { 'x-access-key': '18635a175ba8e6b5db4e3948d3e457904fa404e04e8db0bacde9f4884647eb2a' } });
        setData(fetch.data);
        // populate(fetch.data, setRows)
    } catch (error) {
        console.log(error);
    }
}

function Create() {
    const [formValues, setFormValues] = useState([{ item: null, quantity: null }]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetch(setOptions)
    }, [])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        console.log(formValues)
    }

    let addFormFields = () => {
        setFormValues([...formValues, { item: null, quantity: null }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        const body = {
            items: [...formValues]
        }
        await axios.post('http://127.0.0.1:3333/api/v1/order', body, { headers: { 'x-access-key': '18635a175ba8e6b5db4e3948d3e457904fa404e04e8db0bacde9f4884647eb2a' } });
        alert('order created')
        setFormValues([{ item: null, quantity: null }]);
    }
    return options.length > 0 ? (
        <form onSubmit={handleSubmit}>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <label for="pizza">Pizza</label>
                    <select id="item" name="item" onChange={e => handleChange(index, e)}>
                        {options.length > 0 && options.map(option => {
                            return <option value={option.idPizza} key={option.idPizza}>{option.Name}</option>
                        })}
                    </select>
                    <label>Quantity</label>
                    <input type="number" name="quantity" value={element.quantity || 1} min='1' onChange={e => handleChange(index, e)} />
                    {
                        index ?
                            <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                            : null
                    }
                </div>
            ))}
            <div className="button-section">
                <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                <button className="button submit" type="submit">Submit</button>
            </div>
        </form>
    ) : <p>Loading...</p>
}

export default Create;