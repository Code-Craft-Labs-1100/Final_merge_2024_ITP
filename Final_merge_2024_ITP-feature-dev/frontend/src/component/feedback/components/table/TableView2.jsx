import React from 'react';

const TableView2 = ({ headers }) => {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr className='bg-gray-200'>
                    {headers.map((header, index) => (
                        <th className='border border-gray-400 px-4 py-2 text-left text-sm font-medium uppercase' key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
        </table>
    );
};

export default TableView2;
