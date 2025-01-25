import SelectLocation from './SelectLocation'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { store } from 'app/providers/StoreProvider/config/store'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import { ILocation } from 'services/DataService/types/locationCoordinates'
import { getCoordinateLocation } from 'services/DataService/getData'

interface Response { results: ILocation[]; generationtime_ms: number }

const response: Response = {
    results: [
        {
            id: 524901,
            name: 'Москва',
            latitude: 55.75222,
            longitude: 37.61556,
            elevation: 144,
            feature_code: 'PPLC',
            country_code: 'RU',
            admin1_id: 524894,
            timezone: 'Europe/Moscow',
            population: 10381222,
            country_id: 2017370,
            country: 'Россия',
            admin1: 'Москва',
        },
        {
            id: 5202009,
            name: 'Москва',
            latitude: 41.33675,
            longitude: -75.51852,
            elevation: 476,
            feature_code: 'PPL',
            country_code: 'US',
            admin1_id: 6254927,
            admin2_id: 5196674,
            admin3_id: 5202011,
            timezone: 'America/New_York',
            population: 1960,
            postcodes: ['18444'],
            country_id: 6252001,
            country: 'США',
            admin1: 'Пенсильвания',
            admin2: 'Лакаванна',
            admin3: 'Borough of Moscow',
        },
        {
            id: 1220988,
            name: 'Moskva',
            latitude: 37.66101,
            longitude: 69.62849,
            elevation: 486,
            feature_code: 'PPLA2',
            country_code: 'TJ',
            admin1_id: 1347488,
            timezone: 'Asia/Dushanbe',
            country_id: 1220409,
            country: 'Таджикистан',
            admin1: 'Viloyati Khatlon',
        },
        {
            id: 524900,
            name: 'Москва',
            latitude: 56.91775,
            longitude: 32.16579,
            elevation: 245,
            feature_code: 'PPL',
            country_code: 'RU',
            admin1_id: 480041,
            admin2_id: 511588,
            timezone: 'Europe/Moscow',
            population: 17,
            country_id: 2017370,
            country: 'Россия',
            admin1: 'Тверская область',
            admin2: 'Пеновский Район',
        },
        {
            id: 1528610,
            name: 'Москва',
            latitude: 40.00479,
            longitude: 70.83522,
            elevation: 1140,
            feature_code: 'PPL',
            country_code: 'KG',
            admin1_id: 1463580,
            timezone: 'Asia/Bishkek',
            country_id: 1527747,
            country: 'Киргизия',
            admin1: 'Batkenskaya Oblast’',
        },
    ],
    generationtime_ms: 1.1329651,
};


// (axios.get as unknown as jest.Mock).mockReturnValue(response);
axios as jest.Mocked<typeof axios>

jest.mock('../../../../services/DataService/getData.ts')

// const mockedFetch = jest.mock('node-fetch')
// jest.mock('axios', () => 
//     return {
//         create: jest.fn(() => ({
//             get: () => jest.fn(), //Promise.resolve(response),//jest.fn().mockResolvedValue(response),
//             //   default: jest.fn( () => Promise.resolve(response)),
//             // __esModule: true,
//             // get: jest.fn(() => Promise.resolve({ data: 'data' })),
//             // default: jest.fn(() => Promise.resolve({ data: 'data' })),
//             interceptors: {
//                 request: { use: jest.fn(), eject: jest.fn() },
//                 response: { use: jest.fn(), eject: jest.fn() },
//             },
//         })),
//     }
// })

// const mockedAxios = axios as jest.Mocked<typeof axios>;
// const mockedFetch = fetch as jest.Mocked<typeof fetch>;

// const mockJsonPromise = Promise.resolve(response)
// const mockFethPromise = Promise.resolve({json: () => mockJsonPromise})
// global.fetch = jest.fn().mockImplementation(() => mockFethPromise)

describe('Тест поиска городов', () => {
    test('Наличие input', () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <SelectLocation />
                </Provider>
            </MemoryRouter>
        )
        const input = screen.queryByTestId('inputTest')
        expect(input).toBeInTheDocument()
    })
    test('Наличие значения input', async () => {
        // mockedAxios.get.mockResolvedValue(response)
        // mockedAxios.get.mockImplementationOnce(() => Promise.resolve())

        (getCoordinateLocation as jest.Mock).mockReturnValue(Promise.resolve(response))

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <SelectLocation />
                </Provider>
            </MemoryRouter>
        )
        const input = await screen.findByTestId('inputTest')
        fireEvent.input(input, { target: { value: 'Москва' } })
        expect(input).toContainHTML('Москва')
    })
})

describe('Асинхронный тест поиска городов', () => {
    test('Тест поиска локаций', async () => {
        // mockedFetch .mockResolvedValue(response);
        // mockedAxios.get.mockImplementationOnce(() => Promise.resolve())
        // mockedFetch.mockReturnValue(response)
        // global.fetch = jest.fn(() =>
        //     Promise.resolve({
        //         json: async () => Promise.resolve(response),
        //     })
        // ) as jest.Mock
        // eslint-disable-next-line testing-library/no-unnecessary-act
        // await act(async () => render(<Provider store={store}><SelectLocation /></Provider>))
        // (axios.get as unknown as jest.Mock).mockReturnValue(response);
        
        // mockedAxios.get.mockResolvedValue(response);

        (getCoordinateLocation as jest.Mock).mockReturnValue(Promise.resolve(response))
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <SelectLocation />
                </Provider>
            </MemoryRouter>
        )
        const input = await screen.findByTestId('inputTest')
        fireEvent.input(input, { target: { value: 'Москва' } })
        expect(input).toContainHTML('Москва')
        const elements = await screen.findAllByTestId('locationItem')
        // eslint-disable-next-line testing-library/no-debugging-utils
        // screen.debug()
        // eslint-disable-next-line testing-library/await-async-utils
        // waitFor(() => expect(elements.length).toBe(0))
        console.log(elements)
        expect(elements.length).toBe(5)
        // eslint-disable-next-line testing-library/no-debugging-utils
        screen.debug()
    })
})
