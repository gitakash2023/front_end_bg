import dayjs from 'dayjs';

const staticColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email_id', headerName: 'Email', width: 200 },
    { field: 'mobile_number', headerName: 'Phone Number', width: 200 },
    { field: 'user_role', headerName: 'Role', width: 200 },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 200,
        valueFormatter: (params) => {
            const date = dayjs(params.value);
            return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss') : 'Invalid Date';
        }
    },
    {
        field: 'updatedAt',
        headerName: 'Updated At',
        width: 200,
        valueFormatter: (params) => {
            const date = dayjs(params.value);
            return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss') : 'Invalid Date';
        }
    },
];

export default staticColumns;
