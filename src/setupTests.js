import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export const mockedBusRoutes =  [
  {
    "agencyId": "MTABC",
    "color": "00933C",
    "description": "Via 188Th St / Union Turnpike",
    "id": "MTABC_QM31",
    "longName": "Fresh Meadows - Midtown Via 3 Av",
    "shortName": "QM31",
    "textColor": "FFFFFF",
    "type": 3,
    "url": "http://web.mta.info/busco/schedules/qm001cur.pdf"
  },
  {
    "agencyId": "MTABC",
    "color": "00933C",
    "description": "Via Cross Island Pkwy / Whitestone Expwy",
    "id": "MTABC_QM32",
    "longName": "Bay Terrace - Midtown Via 3 Av",
    "shortName": "QM32",
    "textColor": "FFFFFF",
    "type": 3,
    "url": "http://web.mta.info/busco/schedules/qm002cur.pdf"
  },
]
