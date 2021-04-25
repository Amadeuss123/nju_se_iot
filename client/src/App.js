import { LineHeightOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import api from './api';
import "./App.css";
import Routes from './Routes';


function App() {
  return (
    <div className="container">
      <Routes />
    </div>
  );
}

export default App;

// /api/device/add            uuid token
// /api/device/list           
// deviceList
// [
//   {
//     deviceId,
//     deviceType,
//     deviceStatus
//   }
// ]
// `3000ms`

// /api/light/change  post    
// {
//   deviceId,
//   r:
//   g:
//   b:
// }

// /api/sensor/info deviceId = ? 
// tempList [
//   {
//     time,
//     temperature,
//   }
// ]

