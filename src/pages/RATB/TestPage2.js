import React, { useState, useEffect } from "react";
import SideBar2 from "./SideBar2";
import './index.css'
import { DatePicker, Space, Dropdown, Typography, Select, Table, Tag, Progress, Button, Radio } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';

const { RangePicker } = DatePicker;

export default function TestPage2() {
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
    const [percent, setPercent] = useState(0);
    const [percent2, setPercent2] = useState(0);
    const [percent3, setPercent3] = useState(0);
    const increase = () => {
        setPercent((prevPercent) => {
            const newPercent = prevPercent + 10;
            if (newPercent > 100) {
                return 100;
            }
            return newPercent;
        });
    };
    const decline = () => {
        setPercent((prevPercent) => {
            const newPercent = prevPercent - 10;
            if (newPercent < 0) {
                return 0;
            }
            return newPercent;
        });
    };
    const increase2 = () => {
        setPercent2((prevPercent) => {
            const newPercent = prevPercent + 10;
            if (newPercent > 100) {
                return 100;
            }
            return newPercent;
        });
    };
    const decline2 = () => {
        setPercent2((prevPercent) => {
            const newPercent = prevPercent - 10;
            if (newPercent < 0) {
                return 0;
            }
            return newPercent;
        });
    };
    const increase3 = () => {
        setPercent3((prevPercent) => {
            const newPercent = prevPercent + 10;
            if (newPercent > 100) {
                return 100;
            }
            return newPercent;
        });
    };
    const decline3 = () => {
        setPercent3((prevPercent) => {
            const newPercent = prevPercent - 10;
            if (newPercent < 0) {
                return 0;
            }
            return newPercent;
        });
    };

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
    const options = [
        { label: '코스피', value: '코스피' },
        { label: '코스닥', value: '코스닥' },
    ];
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
                        >
                            <div
                                style={{
                                    margin: 10,
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}
                            >
                                맞춤형 포트폴리오 제작
                            </div>
                            <div
                                style={{
                                    marginTop: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                    fontSize: 15
                                }}
                            >
                                위험 선호도
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginBottom: 10
                                }}
                            >
                                <div
                                    style={{
                                        width: 100
                                    }}
                                >
                                    위험
                                </div>
                                <Progress percent={percent} type="line" strokeColor="#f54b4b" showInfo={false} size={['100%', 30]} />
                                <div
                                    style={{
                                        width: 100
                                    }}
                                >
                                    안전
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Button.Group>
                                    <Button onClick={decline} icon={<MinusOutlined />} />
                                    <Button onClick={increase} icon={<PlusOutlined />} />
                                </Button.Group>
                            </div>
                            <div
                                style={{
                                    marginTop: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                    fontSize: 15
                                }}
                            >
                                시가 총액
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginBottom: 10
                                }}
                            >
                                <div
                                    style={{
                                        width: 100
                                    }}
                                >
                                    기준 없음
                                </div>
                                <Progress percent={percent2} type="line" strokeColor="#3478ff" showInfo={false} size={['100%', 30]} />
                                <div
                                    style={{
                                        width: 100
                                    }}
                                >
                                    높음
                                </div>
                            </div>
                            
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                            <Button.Group>
                                <Button onClick={decline2} icon={<MinusOutlined />} />
                                <Button onClick={increase2} icon={<PlusOutlined />} />
                            </Button.Group>
                            </div>
                            <div
                                style={{
                                    marginTop: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                    fontSize: 15
                                }}
                            >
                                거래대금
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginBottom: 10
                                }}
                            >
                                <div
                                    style={{
                                        width: 100
                                    }}
                                >
                                    기준 없음
                                </div>
                                <Progress percent={percent3} type="line" strokeColor="#3478ff" showInfo={false} size={['100%', 30]} />
                                <div
                                    style={{
                                        width: 100
                                    }}
                                >
                                    높음
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                            <Button.Group>
                                <Button onClick={decline3} icon={<MinusOutlined />} />
                                <Button onClick={increase3} icon={<PlusOutlined />} />
                            </Button.Group>
                            </div>
                            <div
                                style={{
                                    marginTop: 20,
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Radio.Group options={options} optionType="button" />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    marginTop: 20,
                                    justifyContent: 'center'
                                }}
                            >
                                <div>
                                    주식 종목수
                                </div>
                                <Select
                                    defaultValue={product}
                                    style={{
                                        width: 120
                                    }}
                                    onChange={handleChange}
                                    size={"small"}
                                    options={[
                                        {
                                            value: '전체',
                                            label: '전체',
                                        },
                                        {
                                            value: '주식형1호',
                                            label: '주식형1호',
                                        },
                                        {
                                            value: '주식형2호',
                                            label: '주식형2호',
                                        },
                                        {
                                            value: '주식형3호',
                                            label: '주식형3호',
                                        },
                                        {
                                            value: '주식형4호',
                                            label: '주식형4호',
                                        },
                                    ]}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    margin: 20
                                }}
                            >
                                <Button type="primary">조회</Button>
                            </div>
                        </div>
                        <div
                            className="portfolio-body"
                        >
                            <div
                                style={{
                                    margin: 10,
                                    fontWeight: 'bold'
                                }}
                            >
                                추천 종목
                            </div>
                            <Table
                                columns={columns}
                                dataSource={data}
                                size={'small'}
                                onChange={handlePaginationChange} />
                                
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    margin: 20
                                }}
                            >
                                <Button type="primary">종목 수정하기</Button>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}