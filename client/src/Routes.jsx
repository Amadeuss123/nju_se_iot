import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import DeviceList from "./DeviceList.jsx";
import RGBOperation from "./RGBOperation";
import SensorOperation from "./SensorOperation";
import SensorLightOperation from './SensorLightOperation';
import DeviceAdd from './DeviceAdd';


export default function Routes() {
  return (
    <Router basename="/iot">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/device/list" />} />
        <Route exact path="/device/list" render={() => <DeviceList />} />
        <Route exact path="/device/add" render={() => <DeviceAdd />} />
        <Route
          exact
          path="/operate/rgb/:deviceId"
          render={({ match }) => {
            console.log("match ", match);
            return <RGBOperation deviceId={match.params.deviceId} />;
          }}
        />
        <Route
          exact
          path="/operate/sensor/:deviceId"
          render={({ match }) => (
            <SensorOperation deviceId={match.params.deviceId} />
          )}
        />
        <Route
          exact
          path="/operate/sensorlight/:deviceId"
          render={({ match }) => (
            <SensorLightOperation deviceId={match.params.deviceId} />
          )}
        />
      </Switch>
    </Router>
  );
}
