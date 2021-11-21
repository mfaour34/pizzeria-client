import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import MyModal from './modal';

const columns = [
    { field: 'id', headerName: 'ID', },
    { field: 'items', headerName: 'Items' },
    { field: 'total', headerName: 'Total' },
    {
        field: 'timestamp',
        headerName: 'Created at',
        type: 'number',
        width: 200
    }
];

async function fetch(setData, setRows) {
    try {
        let fetch = await axios.get('http://127.0.0.1:3333/api/v1/order', { headers: { 'x-access-key': '18635a175ba8e6b5db4e3948d3e457904fa404e04e8db0bacde9f4884647eb2a' } });
        setData(fetch.data);
        console.log(fetch)
        populate(fetch.data, setRows)
    } catch (error) {
        console.log(error);
    }
}

function populate(data, setRows) {
    let rows = [];
    data.forEach(item => {
        rows.push({ id: item.idorder, timestamp: item.timestamp, total: item.total, items: item.items.length })
    });
    setRows(rows)
}


export default function DataTable() {
    const [data, setData] = useState({});
    const [rows, setRows] = useState([]);
    const [show, setShow] = useState(false);
    const [found, setFound] = useState({});
    useEffect(() => {
        fetch(setData, setRows);
    }, []);

    function handleOnClick(e) {
        console.log(e);
        const id = e.row.id;
        if (data) {
            data.forEach(item => {
                if (item.idorder === id) {
                    setFound(item);
                    setShow(true);
                }
            })
        }

    }
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[20]}
                checkboxSelection={false}
                onCellClick={handleOnClick}
            />
            {show && <MyModal data={found} setShow={setShow} />}
        </div>
    );
}