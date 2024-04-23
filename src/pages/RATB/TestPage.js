import React, { useState, useEffect } from "react";
import SideBar2 from "./SideBar2";
import './index.css'
import { DatePicker, Space, Dropdown, Typography, Select, Table, Tag } from 'antd';
import { DownOutlined, SmileOutline, CaretDownOutlined } from '@ant-design/icons';
import axios from "axios";
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';

const { RangePicker } = DatePicker;

export default function TestPage() {
    const [selectionType, setSelectionType] = useState('checkbox');
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [navVisible, showNavbar] = useState(isMobile ? false : true);
    const [product, setProduct] = useState("전체");
    const [type, setType] = useState("전체");
    const [buyDate, setBuyDate] = useState(dayjs().subtract(12, 'months'));
    const [sellDate, setSellDate] = useState(dayjs().add(1, 'months'));
    const [paginationInfo, setPaginationInfo] = useState({
        current: 1,
        pageSize: 10
    });

    const handleChange = (value) => {
        setProduct(value)
    };
    const handleTypeChange = (value) => {
        setType(value)
    };
    const handlePaginationChange = pagination => {
        setPaginationInfo(pagination);
    };

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const columns = [
        {
            title: 'ETF',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '분류',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '종목코드',
            dataIndex: 'code',
            key: 'code',
        },
    ];

    const data = [
        {
            key: '0',
            'name': 'KODEX200',
            'type': '코스피 200',
            'code': '069500'
        },
        {
            key: '1',
            'name': 'KOSEF50',
            'type': '코스피 50',
            'code': '069550'
        },
        {
            key: '2',
            'name': 'KODEX 2차전지산업',
            'type': 'FnGuide 2차전지 산업 지수',
            'code': '305720'
        },
        {
            key: '3',
            'name': 'KODEX MSCI Korea',
            'type': 'MSCI Korea Index',
            'code': '156080'
        },
        {
            key: '4',
            'name': 'KODEX 고배당',
            'type': 'FnGuide 고배당 Plus 지수',
            'code': '279530'
        }
    ]

    const column2 = [
        {
            title: 'ETF',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '분류',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '종목코드',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '지난 1년간 수익률',
            dataIndex: '1yrprofit',
            key: '1yrprofit'
        },
        {
            title: '지난 1개월 수익률',
            dataIndex: '1mthprofit',
            key: '1mthprofit'
        },
        {
            title: '1개월 예상 수익률',
            dataIndex: '1mthexp',
            key: '1mthexp'
        },
        {
            title: '3개월 예상 수익률',
            dataIndex: '3mthexp',
            key: '3mthexp'
        },
    ];


    const data2 = [
        {
            key: '0',
            'name': 'KODEX200',
            'type': '코스피 200',
            'code': '069500',
            '1yrprofit': '36.58%',
            '1mthprofit': '3.23%',
            '1mthexp': '2.24%',
            '3mthexp': '5.23%'
        },
        {
            key: '1',
            'name': 'KOSEF50',
            'type': '코스피 50',
            'code': '069550',
            '1yrprofit': '23.52%',
            '1mthprofit': '2.36%',
            '1mthexp': '1.34%',
            '3mthexp': '3.73%'
        },
    ]

    return (
        <>
            <div className="App" style={{ height: '100vh' }}>
                <SideBar2 visible={navVisible} show={showNavbar} />
                <>
                    <div className="page page-with-navbar">
                        <div
                            className="portfolio-body"
                            style={{
                                paddingBottom: 30
                            }}
                        >
                            <div
                                style={{
                                    margin: 10,
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}
                            >
                                종목 목록
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        paddingTop: 50,
                                        paddingBottom: 50,
                                        borderRadius: 10,
                                        backgroundColor: '#3478ff',
                                        color: 'white',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                        width: 150,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    배당
                                </div>

                                <div
                                    style={{
                                        paddingTop: 50,
                                        paddingBottom: 50,
                                        borderRadius: 10,
                                        backgroundColor: '#3478ff',
                                        color: 'white',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                        width: 150,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    성장
                                </div>

                                <div
                                    style={{
                                        paddingTop: 50,
                                        paddingBottom: 50,
                                        borderRadius: 10,
                                        backgroundColor: '#3478ff',
                                        color: 'white',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                        width: 150,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    가치
                                </div>

                                <div
                                    style={{
                                        paddingTop: 50,
                                        paddingBottom: 50,
                                        borderRadius: 10,
                                        backgroundColor: '#3478ff',
                                        color: 'white',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                        width: 150,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    중소형
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    marginTop: 10
                                }}
                            >
                                <div
                                    style={{
                                        paddingTop: 50,
                                        paddingBottom: 50,
                                        borderRadius: 10,
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                        width: 150,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Cash
                                </div>

                                <div
                                    style={{
                                        paddingTop: 50,
                                        paddingBottom: 50,
                                        borderRadius: 10,
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                        width: 150,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    전체 주식
                                </div>

                                <div
                                    style={{
                                        paddingTop: 50,
                                        paddingBottom: 50,
                                        borderRadius: 10,
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                        width: 150,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    대형주
                                </div>

                                <div
                                    style={{
                                        paddingTop: 50,
                                        paddingBottom: 50,
                                        borderRadius: 10,
                                        backgroundColor: 'white',
                                        color: 'black',
                                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                        width: 150,
                                        textAlign: 'center',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ESG
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <div
                                className="portfolio-body"
                                style={{
                                    padding: 20
                                }}
                            >
                                <div
                                    style={{
                                        margin: 10,
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}
                                >
                                    포트폴리오
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 10
                                    }}
                                >
                                    <div
                                        style={{
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            borderRadius: 10,
                                            backgroundColor: '#5356FF',
                                            color: 'white',
                                            width: 150,
                                            textAlign: 'center',
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        배당
                                    </div>
                                    <div
                                        style={{
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            borderRadius: 10,
                                            backgroundColor: '#5356FF',
                                            color: 'white',
                                            width: 150,
                                            textAlign: 'center',
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        성장
                                    </div>
                                    <div
                                        style={{
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            borderRadius: 10,
                                            backgroundColor: '#5356FF',
                                            color: 'white',
                                            width: 150,
                                            textAlign: 'center',
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        가치
                                    </div>
                                    <div
                                        style={{
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            borderRadius: 10,
                                            backgroundColor: '#5356FF',
                                            color: 'white',
                                            width: 150,
                                            textAlign: 'center',
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        중소형
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flex: 1
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flex: 1
                                    }}
                                >
                                    <div
                                        className="portfolio-body"
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <div
                                            style={{
                                                padding: 20
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                지난 1년간 수익률
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 30,
                                                    fontWeight: 'bold',
                                                    color: 'black',
                                                    marginTop: 10
                                                }}
                                            >
                                                7.54%
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="portfolio-body"
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                    <div
                                        style={{
                                            padding: 20
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            지난 1개월 수익률
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                color: 'black',
                                                marginTop: 10
                                            }}
                                        >
                                            2.28%
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flex: 1
                                    }}
                                >
                                    <div
                                        className="portfolio-body"
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                    <div
                                        style={{
                                            padding: 20
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            1개월 예상 수익률
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                color: 'black',
                                                marginTop: 10
                                            }}
                                        >
                                            3.62%
                                        </div>
                                    </div>
                                    </div>
                                    <div
                                        className="portfolio-body"
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                    <div
                                        style={{
                                            padding: 20
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            3개월 예상 수익률
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                color: 'black',
                                                marginTop: 10
                                            }}
                                        >
                                            5.52%
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}