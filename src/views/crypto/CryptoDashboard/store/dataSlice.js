import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCryptoDashboardData } from 'services/CryptoService'

export const getCryptoDashboardData = createAsyncThunk('cryptoDashboard/data/getCryptoDashboardData',async (data) => {
    // const response = await apiGetCryptoDashboardData(data)
    const marketData = {
        all: [
            {
                name: 'Bitcoin',
                symbol: 'BTC',
                price: 29877.3,
                change: -5.06,
                volumn: 35664.61,
                marketCap: 570114.24,
                img: '/img/thumbs/bitcoin.png',
            },
            {
                name: 'Ethereum',
                symbol: 'ETH',
                price: 1785.91,
                change: -5.72,
                volumn: 20475.96,
                marketCap: 215744.97,
                img: '/img/thumbs/ethereum.png',
            },
            {
                name: 'TetherUS',
                symbol: 'USDT',
                price: 1,
                change: 0.11,
                volumn: 68677.15,
                marketCap: 72420.54,
                img: '/img/thumbs/tether-us.png',
            },
            {
                name: 'Solana',
                symbol: 'SOL',
                price: 40.25,
                change: 1.90,
                volumn: 1217.08,
                marketCap: 13752.04,
                img: '/img/thumbs/solana.png',
            },
            {
                name: 'Dogecoin',
                symbol: 'DOGE',
                price: 0.07979,
                change: -0.31,
                volumn: 269.01,
                marketCap: 10575.18,
                img: '/img/thumbs/doge.png',
            },
            {
                name: 'Polkadot',
                symbol: 'DOT',
                price: 9.18,
                change: 0.99,
                volumn: 339.99,
                marketCap: 9056.1,
                img: '/img/thumbs/polkadot.png',
            },
            {
                name: 'TRON',
                symbol: 'TRX',
                price: 0.08108,
                change: 0.31,
                volumn: 693.31,
                marketCap: 7533.89,
                img: '/img/thumbs/tron.png',
            },
            {
                name: 'Avalanche',
                symbol: 'AVAX',
                price: 24.65,
                change: 0.04,
                volumn: 640.76,
                marketCap: 6919.55,
                img: '/img/thumbs/avalanche.png',
            },
            {
                name: 'SHIBA INU',
                symbol: 'SHIB',
                price: 0.00001,
                change: -1.49,
                volumn: 369.34,
                marketCap: 6039.69,
                img: '/img/thumbs/shiba-inu.png',
            },
            {
                name: 'Polygon',
                symbol: 'MATIC',
                price: 0.63300,
                change: 2.93,
                volumn: 543.23,
                marketCap: 5036.26,
                img: '/img/thumbs/polygon.png',
            },
            {
                name: 'Stellar Lumens',
                symbol: 'XLM',
                price: 0.14040,
                change: -1.89,
                volumn: 121.73,
                marketCap: 3501.92,
                img: '/img/thumbs/stellar-lumens.png',
            },
            {
                name: 'EOS',
                symbol: 'EOS',
                price: 1.25,
                change: -1.57,
                volumn: 234.66,
                marketCap: 1239.57,
                img: '/img/thumbs/eos.png',
            }
        ],
        spot: [
            {
                name: 'BTC/USDT',
                symbol: 'BTC',
                amount: 29877.3,
                price: 29877.3,
                change: 0.07,
                turnOver: 495.98,
                volumn: 152079.48,
                high: 30680.09,
                low: 29877.3
            },
            {
                name: 'ETH/USDT',
                symbol: 'ETH',
                amount: 1728.13,
                price: 1728.13,
                change: 0.06,
                turnOver: 152.5,
                volumn: 147429.20,
                high: 1730.71,
                low: 1724.22
            }, 
            {
                name: 'DOT/USDT',
                symbol: 'DOT',
                amount: 8.7175,
                price: 8.7,
                change: -1.47,
                turnOver: 467,
                volumn: 554369,
                high: 8.8553,
                low: 8.582
            },
            {
                symbol: 'XRP',
                name: 'XRP/USDT',
                amount: 0.3811,
                price: 0.38,
                change: -1.63,
                turnOver: 19.4,
                volumn: 48977539,
                high: 0.3877,
                low: 0.3768
            }, 
            {
                name: 'LINK/USDT',
                symbol: 'LINK',
                amount: 8.3476,
                price: 8.35,
                change: -2.84,
                turnOver: 10.27,
                volumn: 11438939,
                high: 8.627,
                low: 8.231
            }, 
            {
                name: 'BCH/USDT',
                symbol: 'BCH',
                amount: 166.36,
                price: 166.36,
                change: -2.44,
                turnOver: 3.02,
                volumn: 1756432,
                high: 172.08,
                low: 165.86
            }, 
            {
                name: 'LTC/USDT',
                symbol: 'LTC',
                amount: 56.48,
                price: 56.48,
                change: -1.67,
                turnOver: 6.87,
                volumn: 117724,
                high: 57.50,
                low: 55.56
            },
            {
                name: 'BSV/USDT',
                symbol: 'BSV',
                amount: 57.8047,
                price: 57.8,
                change: -0.78,
                turnOver: 1.73,
                volumn: 30348,
                high: 58.79,
                low: 57.01
            }, 
            {
                name: 'ADA/USDT',
                symbol: 'ADA',
                amount: 0.5754,
                price: 0.57,
                change: -2.07,
                turnOver: 9.27,
                volumn: 15306578,
                high: 0.5885,
                low: 0.6953
            },
            {
                name: 'EOS/USDT',
                symbol: 'EOS',
                amount: 1.1842,
                price: 1.18,
                change: 1.96,
                turnOver: 3.09,
                volumn: 2587323,
                high: 1.2099,
                low: 1.1708
            }, 
            {
                name: 'TRX/USDT',
                symbol: 'TRX',
                amount: 0.079,
                price: 0.079,
                change: -1.14,
                turnOver: 18.37,
                volumn: 228015768,
                high: 0.08,
                low: 0.079
            }, 
            {
                name: 'XMR/USDT',
                symbol: 'XMR',
                amount: 173.67,
                price: 173.67,
                change: 1.12,
                turnOver: 5.04,
                volumn: 900314,
                high: 175.18,
                low: 170.39
            }, 
            {
                name: 'IOTA/USDT',
                symbol: 'IOTA',
                amount: 0.3228,
                price: 0.32,
                change: -1.43,
                turnOver: 0.18,
                volumn: 327851,
                high: 0.3287,
                low: 0.3184
            }, 
        ],
        futures: [
            {
                name: 'BTCUSDT',
                symbol: 'BTC',
                amount: 29877.3,
                price: 29877.3,
                change: 0.07,
                turnOver: 495.98,
                volumn: 152079.48,
                high: 30680.09,
                low: 29877.3
            },
            {
                name: 'ETHUSDT',
                symbol: 'ETH',
                amount: 1728.13,
                price: 1728.13,
                change: 0.06,
                turnOver: 152.5,
                volumn: 147429.20,
                high: 1730.71,
                low: 1724.22
            }, 
            {
                name: 'DOTUSDT',
                symbol: 'DOT',
                amount: 8.7175,
                price: 8.7,
                change: -1.47,
                turnOver: 467,
                volumn: 554369,
                high: 8.8553,
                low: 8.582
            },
            {
                symbol: 'XRP',
                name: 'XRPUSDT',
                amount: 0.3811,
                price: 0.38,
                change: -1.63,
                turnOver: 19.4,
                volumn: 48977539,
                high: 0.3877,
                low: 0.3768
            }, 
            {
                name: 'LINKUSDT',
                symbol: 'LINK',
                amount: 8.3476,
                price: 8.35,
                change: -2.84,
                turnOver: 10.27,
                volumn: 11438939,
                high: 8.627,
                low: 8.231
            }, 
            {
                name: 'BCHUSDT',
                symbol: 'BCH',
                amount: 166.36,
                price: 166.36,
                change: -2.44,
                turnOver: 3.02,
                volumn: 1756432,
                high: 172.08,
                low: 165.86
            }, 
            {
                name: 'LTCUSDT',
                symbol: 'LTC',
                amount: 56.48,
                price: 56.48,
                change: -1.67,
                turnOver: 6.87,
                volumn: 117724,
                high: 57.50,
                low: 55.56
            },
            {
                name: 'BSVUSDT',
                symbol: 'BSV',
                amount: 57.8047,
                price: 57.8,
                change: -0.78,
                turnOver: 1.73,
                volumn: 30348,
                high: 58.79,
                low: 57.01
            }, 
            {
                name: 'ADAUSDT',
                symbol: 'ADA',
                amount: 0.5754,
                price: 0.57,
                change: -2.07,
                turnOver: 9.27,
                volumn: 15306578,
                high: 0.5885,
                low: 0.6953
            },
            {
                name: 'EOSUSDT',
                symbol: 'EOS',
                amount: 1.1842,
                price: 1.18,
                change: 1.96,
                turnOver: 3.09,
                volumn: 2587323,
                high: 1.2099,
                low: 1.1708
            }, 
            {
                name: 'TRXUSDT',
                symbol: 'TRX',
                amount: 0.079,
                price: 0.079,
                change: -1.14,
                turnOver: 18.37,
                volumn: 228015768,
                high: 0.08,
                low: 0.079
            }, 
            {
                name: 'XMRUSDT',
                symbol: 'XMR',
                amount: 173.67,
                price: 173.67,
                change: 1.12,
                turnOver: 5.04,
                volumn: 900314,
                high: 175.18,
                low: 170.39
            }, 
            {
                name: 'IOTAUSDT',
                symbol: 'IOTA',
                amount: 0.3228,
                price: 0.32,
                change: -1.43,
                turnOver: 0.18,
                volumn: 327851,
                high: 0.3287,
                low: 0.3184
            },
        ]
    }
    const walletsData = [
        {
            icon: '/img/thumbs/bitcoin.png',
            symbol: 'BTC',
            name: 'Bitcoin',
            fiatValue: 15032,
            coinValue: 0.5832112,
            growshrink: 16.7,
            address: 'n1RyjN4dyBDA9cKzAzAKfWoHEZkGMizFDo'
        },
        {
            icon: '/img/thumbs/ethereum.png',
            symbol: 'ETH',
            name: 'Ethereum',
            fiatValue: 11246,
            coinValue: 1.7294746,
            growshrink: -8.3,
            address: '0x3E6EB215F825224D33E588F29C54FF2AF21EC91D'
        },
        {
            icon: '/img/thumbs/solana.png',
            symbol: 'SOL',
            name: 'Solana',
            fiatValue: 8273,
            coinValue: 196.9766,
            growshrink: 4.9,
            address: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH'
        }
    ]
    const cryptoDashboardData = {
        portfolioStatsData: {
            week: {
                series: [
                    {
                        name: "Porfolio Balance",
                        data: [24773.31, 33188.05, 29175.61, 36728.42, 34730.97, 43912.42, 40774.19],
                    },
                ],
                timeRange: [ '01 Feb',  '02 Feb',  '03 Feb',  '04 Feb',  '05 Feb',  '06 Feb',  '07 Feb']
            },
            month: {
                series: [
                    {
                        name: "Porfolio Balance",
                        data: [14576.39, 23895.12, 19473.64, 26454.96, 24741.98, 33153.32, 30218.32, 37645.11, 35556.15, 38886.34, 36135.95, 45966.12],
                    },
                ],
                timeRange:[
                    '02 Jan', 
                    '05 Jan', 
                    '07 Jan', 
                    '10 Jan', 
                    '13 Jan', 
                    '15 Jan', 
                    '18 Jan', 
                    '20 Jan', 
                    '23 Jan',
                    '25 Jan', 
                    '28 Jan', 
                    '30 Jan'
                ]
            },
            year: {
                series: [
                    {
                        name: "Porfolio Balance",
                        data: [20874.12, 26583.56, 23943.65, 24453.84, 22473.43, 29185.37, 27815.48, 36834.69, 32422.11, 35888.32, 32112.84, 38764.22]
                    },
                ],
                timeRange:[
                    'Jan', 
                    'Feb', 
                    'Mar', 
                    'Apr', 
                    'May', 
                    'Jun', 
                    'Jul', 
                    'Aug', 
                    'Sep',
                    'Oct', 
                    'Nov', 
                    'Dec'
                ]
            },
        },
        recentAcivityData: [
            {
                date: 'June 3, 2022',
                data: [
                    {
                        coinValue: 0.0383522,
                        fiatValue: 1161.5,
                        symbol: 'BTC',
                        curency: 'USD',
                        action: 'Buy BTC',
                        actionType: 0
                    },
                    {
                        coinValue: 0.0754234,
                        fiatValue: 2284.2,
                        symbol: 'BTC',
                        curency: 'USD',
                        action: 'Received BTC',
                        actionType: 1
                    }
                ]
            },
            {
                date: 'June 2, 2022',
                data: [
                    {
                        coinValue: 3.1754361,
                        fiatValue: 5779.13,
                        symbol: 'ETH',
                        curency: 'USD',
                        action: 'Buy ETH',
                        actionType: 0
                    },
                    {
                        coinValue: 0.2821331,
                        fiatValue: 513.47,
                        symbol: 'ETH',
                        curency: 'USD',
                        action: 'Sent ETH',
                        actionType: 2
                    },
                    {
                        coinValue: 0.1376231,
                        fiatValue: 4163.84,
                        symbol: 'BTC',
                        curency: 'USD',
                        action: 'Received BTC',
                        actionType: 1
                    }
                ]
            }
        ],
        marketValueData: marketData.all.filter((_, index) => index <= 4) ,
        holdingsData: [
            ...walletsData,
            {
                icon: '/img/thumbs/litecoin.png',
                symbol: 'LTC',
                name: 'Litecoin',
                fiatValue: 5291,
                coinValue: 93.67,
                growshrink: 11.34,
            }
        ]
    }
    return cryptoDashboardData
})

const dataSlice = createSlice({
    name: 'cryptoDashboard/data',
    initialState: {
        loading: true,
        dashboardData: {},
    },
    reducers: {
        
    },
    extraReducers: {
        [getCryptoDashboardData.fulfilled]: (state, action) => {
            state.loading = false
            state.dashboardData = action.payload
        },
        [getCryptoDashboardData.pending]: (state) => {
            state.loading = true
        },
    }
})

export default dataSlice.reducer
