import React, {useState, useMemo, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';
import {useTable, useFilters, useGlobalFilter, useSortBy} from 'react-table';
import {readInstruments} from "../../services/httpContextAccessor";
import TokenBuySellModel from '../../models/TokenBuySellModel';
import './MyPortfolioTable.css';

const ActionButtons = ({row}) => {
    let navigate = useNavigate();
    const handleBuyClick = () => {
        const {instrumentTokenId,expireDate, isinCode, type, buyPrice, sellPrice,commissionPercent, currency, contractABI, contractAddress, quantity} = row.original;
        const processType = 'BUY'
        const tokenBuySell = new TokenBuySellModel(instrumentTokenId,expireDate, isinCode, type, buyPrice, sellPrice, commissionPercent, currency, contractABI, contractAddress, quantity, processType);
        navigate('/token-buy-sell', {state: tokenBuySell});
    };

    const handleSellClick = () => {
        const {instrumentTokenId,expireDate, isinCode, type, buyPrice, sellPrice,commissionPercent, currency, contractABI, contractAddress, quantity} = row.original;
        const processType = 'SELL'
        const tokenBuySell = new TokenBuySellModel(instrumentTokenId,expireDate, isinCode, type, buyPrice, sellPrice, commissionPercent, currency, contractABI, contractAddress, quantity, processType);
        navigate('/token-buy-sell', {state: tokenBuySell});
    };

    return (
        <div className="my-portfolio-action-buttons">
            <button onClick={handleBuyClick} id="my-portfolio-buy-button" className="my-portfolio-trade-button">
                <FaArrowUp className="my-portfolio-button-icon"/> BUY
            </button>

            <button onClick={handleSellClick} id="my-portfolio-sell-button" className="my-portfolio-trade-button">
                <FaArrowDown className="my-portfolio-button-icon"/> SELL
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
        Header: 'QUANTITY',
        accessor: 'quantity',
        Cell: ({row}) => <div>{row.original.quantity}</div>,
    },
];

function MyPortfolioTable() {
    const [tableData, setTableData] = useState([]);
    const [allInstruments, setAllInstruments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await readInstruments();
                setAllInstruments(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const akbCustodySolutionsBondData
            = allInstruments.find(instrument => instrument.isinCode === 'AKB Custody Solutions');
        if (akbCustodySolutionsBondData) {
            setTableData([{
                isinCode: akbCustodySolutionsBondData.isinCode,
                type: akbCustodySolutionsBondData.type,
                buyPrice: akbCustodySolutionsBondData.buyPrice,
                sellPrice: akbCustodySolutionsBondData.sellPrice,
                commissionPercent: akbCustodySolutionsBondData.commissionPercent,
                currency: akbCustodySolutionsBondData.currency,
                contractABI: akbCustodySolutionsBondData.contractABI,
                contractAddress: akbCustodySolutionsBondData.contractAddress,
                quantity: 23,
            }]);
        }
    }, [allInstruments]);

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
        <div className="my-portfolio-container">
            <div className="my-portfolio-table">
                <input
                    className="my-portfolio-search-all-columns"
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder="Search all columns"
                />
                <table className="my-portfolio-table" {...getTableProps()}>
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
        </div>
    );
}

export default MyPortfolioTable;