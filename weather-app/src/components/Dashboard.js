import React, { useState } from "react";
import { Layout, Row, Col, Card, Typography, Input, Button } from "antd";
import { CompassOutlined } from "@ant-design/icons";
import { BsThermometer, BsMoisture } from "react-icons/bs";

// Import the fetchData function
import { fetchData } from "../services/fetchData";

// Import the FiveDayForecast component
import FiveDayForecast from "./FiveDayForecast";

// Import the convertTemperature function
import { convertTemperature } from "../services/TempConverter";

// Import the Loader component
import Loader from "./Loader";

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

function Dashboard() {
  const logo = process.env.PUBLIC_URL + "/assets/logo-black.png";

  // State vars
  const [weatherData, setWeatherData] = useState(null); // Stores the fetched weather data
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [loading, setLoading] = useState(false);

  // search functionality
  const handleSearch = async (searchValue) => {
    setLoading(true); // Set loading to true before making the API call

    try {
      if (searchValue.trim() !== "") {
        const data = await fetchData(searchValue);
        setWeatherData(data); // update weatherData state with the fetched data
      } else {
        setWeatherData(null); // reset the weatherData state to null if the search value is empty
      }
    } catch (error) {
      alert("Error fetching weather data. Please try again.");
      setWeatherData(null); // Reset the weatherData state to null in case of an error
    }
    setLoading(false); // Set loading to false after the API call is complete
  };

  const toggleTemperatureUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  const temperature = weatherData?.main?.temp;
  const convertedTemperature = convertTemperature(temperature, isFahrenheit);

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Content style={{ padding: "50px", textAlign: "center" }}>
        <div>
          <img
            className="logo"
            width={360}
            src={logo}
            alt="Image"
            style={{ marginRight: "auto", textAlign: "center" }}
          />
        </div>
        <Search
          placeholder="Please enter a city"
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          style={{
            fontSize: "48px",
            marginTop: "30px",
            marginBottom: "16px",
            maxWidth: "600px",
            color: "#000",
          }}
        />
        <Title
          level={3}
          style={{
            textAlign: "center",
            color: "#1890ff",
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "30px",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          }}>
          TODAY'S WEATHER OVERVIEW
        </Title>

        <Button
          onClick={toggleTemperatureUnit}
          style={{
            marginBottom: "20px",
            width: "120px",
            backgroundColor: "#FFDD4A",
            fontWeight: "bold",
            textAlign: "center",
            borderColor: "#1890ff",
          }}>
          {!isFahrenheit ? "Fahrenheit" : "Celsius"}
        </Button>
        <Row gutter={[16, 16]}>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}>
            <Card
              style={{
                height: "250px",
                backgroundColor: "#E6E6E6",

                textAlign: "center",
              }}>
              {weatherData?.weather[0].description === "clear sky" ? (
                <span
                  role="img"
                  aria-label="Clear Sky"
                  style={{ fontSize: "48px", marginBottom: "16px" }}>
                  ☀️
                </span>
              ) : weatherData?.weather[0].description.includes("rain") ? (
                <span
                  role="img"
                  aria-label="Rain"
                  style={{ fontSize: "48px", marginBottom: "16px" }}>
                  🌧️
                </span>
              ) : weatherData?.weather[0].description.includes(
                  "thunderstorm"
                ) ? (
                <span
                  role="img"
                  aria-label="Thunderstorm"
                  style={{ fontSize: "48px", marginBottom: "16px" }}>
                  ⛈️
                </span>
              ) : (
                <span
                  role="img"
                  aria-label="Cloudy"
                  style={{ fontSize: "48px", marginBottom: "16px" }}>
                  ☁️
                </span>
              )}

              <Title level={4}>Overview</Title>
              <p>{weatherData?.weather[0].description}</p>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}>
            <Card
              style={{
                height: "250px",
                backgroundColor: "#E6E6E6",

                textAlign: "center",
              }}>
              <BsThermometer
                style={{ fontSize: "48px", marginBottom: "16px" }}
              />
              <Title level={4}>Temperature</Title>
              {temperature ? (
                <>
                  <p>
                    {Math.floor(convertedTemperature)}°
                    {isFahrenheit ? "F" : "C"}
                  </p>
                </>
              ) : (
                <p>-</p>
              )}
            </Card>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            style={{ height: "250px" }}>
            <Card
              style={{
                height: "250px",
                backgroundColor: "#E6E6E6",

                textAlign: "center",
              }}>
              <CompassOutlined
                style={{ fontSize: "48px", marginBottom: "16px" }}
              />
              <Title level={4}>Wind Speed</Title>
              <p>{weatherData?.wind?.speed} km/h</p>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}>
            <Card
              style={{
                height: "250px",
                backgroundColor: "#E6E6E6",

                textAlign: "center",
              }}>
              <BsMoisture style={{ fontSize: "48px", marginBottom: "16px" }} />
              <Title level={4}>Humidity</Title>
              <p>{weatherData?.main?.humidity}%</p>
            </Card>
          </Col>
        </Row>
        {loading && <Loader />}
        {weatherData && (
          <FiveDayForecast
            city={weatherData.name}
            isFahrenheit={isFahrenheit}
            toggleTemperatureUnit={toggleTemperatureUnit}
          />
        )}
      </Content>
    </Layout>
  );
}

export default Dashboard;
