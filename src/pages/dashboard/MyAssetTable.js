import React, {useState, useMemo, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaArrowUp} from 'react-icons/fa';
import {readInstruments} from '../../services/httpContextAccessor.js';
import {useTable, useFilters, useGlobalFilter, useSortBy} from 'react-table';
import TokenBuySellModel from '../../models/TokenBuySellModel';
import './MyAssetTable.css';

const ActionButtons = ({row}) => {
    let navigate = useNavigate();

    const handleBuyClick = () => {
        const {instrumentTokenId,expireDate, isinCode, type, buyPrice, sellPrice, commissionPercent, currency, contractABI, contractAddress} = row.original;
        const quantity = 0
        const processType = 'BUY'
        const tokenBuySell = new TokenBuySellModel(instrumentTokenId,expireDate, isinCode, type, buyPrice, sellPrice, commissionPercent, currency, contractABI, contractAddress,quantity, processType);
        navigate('/token-buy-sell', {state: tokenBuySell});
    };

    return (
        <div>
            <button onClick={handleBuyClick} id="my-asset-buy-button" className="my-asset-trade-button">
                <FaArrowUp className="my-asset-button-icon"/> BUY
            </button>
        </div>
    );
};

// COLUMN CONFIGURATION
const tableColumns = [
    {
        Header: 'ACTIONS',
        id: 'actions',
        Cell: ({row}) => <ActionButtons row={row}/>,
    },
    {
        Header: 'EXPIRE DATE',
        accessor: 'expireDate',
        Cell: ({row}) => <div>{row.original.expireDate}</div>,
    },
    {
        Header: 'ISIN CODE',
        accessor: 'isinCode',
        Cell: ({row}) => <div>{row.original.isinCode}</div>,
    },
    {
        Header: 'TYPE',
        accessor: 'type',
        Cell: ({row}) => <div>{row.original.type}</div>,
    },
    {
        Header: 'BUY PRICE',
        accessor: 'buyPrice',
        Cell: ({row}) => <div>{row.original.buyPrice}</div>,
    },
    {
        Header: 'SELL PRICE',
        accessor: 'sellPrice',
        Cell: ({row}) => <div>{row.original.sellPrice}</div>,
    },
    {
        Header: 'COMMISION PERCENT',
        accessor: 'commissionPercent',
        Cell: ({row}) => <div>{row.original.commissionPercent}</div>,
    },
    {
        Header: 'CURRENCY',
        accessor: 'currency',
        Cell: ({row}) => <div>{row.original.currency}</div>,
    },
    {
        Header: 'IS ACTIVE',
        accessor: 'isActive',
        Cell: ({row}) => {
            return (
                <span className={row.original.isActive === 'Active' ? 'status active' : 'status inactive'}>
                    {row.original.isActive}
                </span>
            );
        },
    },
];

function MyAssetTable() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await readInstruments();
                setTableData(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // CREATE COLUMN AND DATASTRUCTURE WITH useMemo
    const columns = useMemo(() => tableColumns, []);
    const data = useMemo(() => tableData, [tableData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
    } = useTable({columns, data}, useFilters, useGlobalFilter, useSortBy);

    const [filterInput, setFilterInput] = useState('');

    // GLOBAL FILTER FUNCTION
    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setGlobalFilter(value);
        setFilterInput(value);
    };

    return (
        <div>
            <input
                className="my-assets-search-all-columns"
                value={filterInput}
                onChange={handleFilterChange}
                placeholder="Search all columns"
            />

            <table className="my-assets-table" {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
                  </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default MyAssetTable;