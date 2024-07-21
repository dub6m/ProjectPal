import React, { useContext, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ProgressBar from './ProgressBar';
import StatusCell from './StatusCell';
import './PjTable.css';

function PjTable({ editToggle, deleteToggle }) {
    const { user } = useContext(UserContext);
    const [projs, setProjs] = useState(user.projects);
    const navigate = useNavigate();

    useEffect(() => {
        setProjs(user.projects);
    }, [user.projects]);

    const handleEdit = (event, projectId) => {
        event.stopPropagation();
        for (let i = 0; i < user.projects.length; i++) {
            if (user.projects[i].id === projectId) {
                editToggle(user.projects[i]);
                break;
            }
        }
        console.log(`Edit project with ID: ${projectId}`);
    };

    const handleDelete = (event, projectId) => {
        event.stopPropagation();
        for (let i = 0; i < user.projects.length; i++) {
            if (user.projects[i].id === projectId) {
                deleteToggle(user.projects[i]);
                break;
            }
        }
        console.log(`Delete project with ID: ${projectId}`);
    };

    const data = React.useMemo(() => projs, [projs]);
    const header = React.useMemo(() => [
        {
            Header: 'Name',
            accessor: 'title',
            Cell: ({ cell: { value } }) => (
                <div>
                    <i className='bx bxs-grid-alt'></i> {value}
                </div>
            )
        },
        {
            Header: 'Status',
            accessor: (row) => row.toDo.getStatus(),
            Cell: ({ cell: { value } }) => <StatusCell status={value} />
        },
        {
            Header: 'Progress',
            accessor: 'toDo.progress',
            Cell: ({ cell: { value } }) => <ProgressBar progress={value} />
        },
        {
            Header: 'Due Date',
            accessor: 'dueDate',
            Cell: ({ cell: { value } }) => format(new Date(value), 'MMMM dd, yyyy')
        },
        {
            Header: ' ',
            Cell: ({ row }) => (
                <div className="other-actions">
                    <button className='edit-button' onClick={(event) => handleEdit(event, row.original.id)}><i className='bx bx-edit-alt'></i></button>
                    <button className='trash-button' onClick={(event) => handleDelete(event, row.original.id)}><i className='bx bx-trash'></i></button>
                </div>
            )
        }
    ], [projs]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns: header, data });

    const rowClick = (row) => {
        navigate(`/projects/${row.original.id}`);
    };

    return (
        <div className='container'>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} onClick={() => rowClick(row)}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PjTable;
