import React, { useEffect, useState } from "react";
import { Slider, PageHeader } from "antd";
import debounce from "lodash/debounce";
import api from "./api";
import Bulb from './assets/Bulb';

export default function RGBOperation(props) {
  const { deviceId } = props;
  const [rValue, setRValue] = useState(Number(localStorage.getItem(`${deviceId}-R`)) || 0);
  const [gValue, setGValue] = useState(Number(localStorage.getItem(`${deviceId}-G`)) || 0);
  const [bValue, setBValue] = useState(Number(localStorage.getItem(`${deviceId}-B`)) || 0);
  
  useEffect(() => {
    api.post('/api/rgb/change', {
      deviceId,
      r: rValue,
      g: gValue,
      b: bValue,
    })
    return () => {
      localStorage.setItem(`${deviceId}-R`, rValue);
      localStorage.setItem(`${deviceId}-G`, gValue);
      localStorage.setItem(`${deviceId}-B`, bValue);
    }
  }, [bValue, deviceId, gValue, rValue]);

  function rgbToHex(...args) {
    let res = "#";
    for (let value of args) {
      console.log(typeof value);
      let item = Number(value).toString(16);
      console.log("item ", item);
      if (item.length === 1) {
        item = "0" + item;
      }
      res += item;
    }
    console.log("res ", res);
    return res;
  }

  const handleValue = (type) => {
    return debounce((value) => {
      console.log(value);
      switch (type) {
        case "R":
          setRValue(value);
          break;
        case "G":
          setGValue(value);
          break;
        case "B":
          setBValue(value);
          break;
        default:
          break;
      }
    }, 50);
  };

  const sliderProps = {
    min: 0,
    max: 255,
  };

  const RIcon = () => (
    <svg
      t="1619272839466"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4093"
      width="32"
      height="32"
    >
      <path
        d="M716.1856 744.2432h-72.4992l-78.0288-131.4816c-15.36-26.4192-30.72-44.8512-43.008-54.6816-12.288-9.8304-29.4912-14.1312-47.3088-14.1312h-44.8512v199.68h-61.44V268.6976H514.048c46.08 0 82.3296 11.0592 108.7488 33.792 26.4192 22.1184 39.3216 52.8384 39.3216 93.3888 0 65.7408-35.0208 108.7488-106.2912 128.4096v1.2288c12.288 5.5296 23.9616 14.1312 33.792 23.9616s22.1184 27.648 36.2496 52.8384l90.3168 141.9264zM431.104 322.7648v167.7312h72.4992c27.648 0 50.3808-8.6016 68.1984-25.1904 18.432-16.5888 26.4192-37.4784 26.4192-64.512 0-25.1904-8.6016-44.8512-23.9616-58.368-15.36-14.1312-39.3216-20.8896-70.0416-20.8896h-73.728v1.2288h0.6144z"
        fill="#d81e06"
        p-id="4094"
      ></path>
      <path
        d="M513.4336 58.5728c-254.3616 0-460.8 206.4384-460.8 460.8s206.4384 460.8 460.8 460.8 460.8-206.4384 460.8-460.8-206.4384-460.8-460.8-460.8z m0 866.9184C289.792 925.4912 108.544 744.2432 108.544 520.6016S289.792 115.712 513.4336 115.712 918.3232 296.96 918.3232 520.6016s-181.248 404.8896-404.8896 404.8896z"
        fill="#d81e06"
        p-id="4095"
      ></path>
    </svg>
  );

  const GIcon = () => (
    <svg
      t="1619272866648"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4381"
      width="32"
      height="32"
    >
      <path
        d="M682.1888 725.4016C634.88 751.8208 581.4272 765.952 521.8304 765.952c-68.1984 0-124.1088-22.1184-165.888-65.7408-41.7792-43.008-62.6688-101.9904-62.6688-174.4896 0-73.728 23.9616-133.9392 70.0416-181.248s106.2912-71.2704 178.7904-71.2704c51.6096 0 95.232 8.6016 129.6384 25.1904v65.7408c-37.4784-23.9616-83.5584-36.2496-135.168-36.2496s-95.232 18.432-128.4096 52.8384-50.3808 82.3296-50.3808 139.4688c0 60.2112 15.36 106.2912 46.08 139.4688 30.72 33.792 72.4992 50.3808 125.952 50.3808 36.2496 0 66.9696-6.7584 92.16-20.8896v-128.4096h-103.2192v-54.6816h164.6592v219.3408h-1.2288z"
        fill="#1afa29"
        p-id="4382"
      ></path>
      <path
        d="M518.7584 59.392c-254.3616 0-460.8 206.4384-460.8 460.8s206.4384 460.8 460.8 460.8 460.8-206.4384 460.8-460.8-206.4384-460.8-460.8-460.8z m0 866.9184c-223.6416 0-404.8896-181.248-404.8896-404.8896S295.1168 116.5312 518.7584 116.5312 923.648 297.7792 923.648 521.4208s-181.248 404.8896-404.8896 404.8896z"
        fill="#1afa29"
        p-id="4383"
      ></path>
    </svg>
  );

  const BIcon = () => (
    <svg
      t="1619272983110"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4895"
      width="32"
      height="32"
    >
      <path
        d="M393.0112 753.0496V278.1184H532.48c41.7792 0 75.5712 9.8304 100.7616 29.4912s37.4784 46.08 37.4784 79.872c0 26.4192-6.7584 49.152-22.1184 70.0416-15.36 19.6608-35.0208 35.0208-61.44 43.008v1.2288c31.9488 4.3008 58.368 15.36 76.8 36.2496 19.6608 20.8896 29.4912 47.3088 29.4912 79.872 0 40.5504-15.36 73.728-44.8512 98.9184s-66.9696 37.4784-113.0496 37.4784h-142.5408v-1.2288z m60.2112-421.4784v149.2992h55.9104c29.4912 0 52.8384-6.7584 70.0416-20.8896 16.5888-14.1312 25.1904-35.0208 25.1904-60.2112 0-44.8512-29.4912-66.9696-89.088-66.9696l-62.0544-1.2288z m0 202.1376v165.888h73.728c31.9488 0 57.1392-6.7584 73.728-22.1184 18.432-15.36 26.4192-35.0208 26.4192-61.44 0-54.6816-36.2496-81.1008-110.592-81.1008l-63.2832-1.2288z"
        fill="#1296db"
        p-id="4896"
      ></path>
      <path
        d="M515.8912 56.32c-254.3616 0-460.8 206.4384-460.8 460.8s206.4384 460.8 460.8 460.8 460.8-206.4384 460.8-460.8-206.4384-460.8-460.8-460.8z m0 866.9184c-223.6416 0-404.8896-181.248-404.8896-404.8896S292.2496 113.4592 515.8912 113.4592s404.8896 181.248 404.8896 404.8896-181.248 404.8896-404.8896 404.8896z"
        fill="#1296db"
        p-id="4897"
      ></path>
    </svg>
  );

  return (
    <>
      <PageHeader title="RGB灯信息" subTitle={`设备编号${deviceId}`} onBack={() => window.history.back()} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{width: '30%', textAlign: 'center'}}>
          <Bulb fill={rgbToHex(rValue, gValue, bValue)} />
        </div>
        <div style={{ width: "60%", marginLeft: 50 }}>
          <RIcon />
          <Slider {...sliderProps} onChange={handleValue("R")} defaultValue={rValue} />
          <GIcon />
          <Slider {...sliderProps} onChange={handleValue("G")} defaultValue={gValue} />
          <BIcon />
          <Slider {...sliderProps} onChange={handleValue("B")} defaultValue={bValue} />
        </div>
      </div>
    </>
  );
}
