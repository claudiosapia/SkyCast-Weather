import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import moment from "moment";
import { convertTemperature } from "../services/TempConverter";
import { fetchFiveDayData } from "../services/fetchFiveDayData";
import { BsThermometer } from "react-icons/bs";

const { Title } = Typography;
function FiveDayForecast({ city, isFahrenheit, toggleTemperatureUnit }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (city.trim() !== "") {
          const data = await fetchFiveDayData(city);
          setForecast(
            data?.list.filter((item, index) => index % 8 === 0).slice(0, 5)
          );
        } else {
          setForecast(null);
        }
      } catch (error) {
        alert("Error fetching weather data. Please try again.");
        setForecast(null);
      }
    }

    fetchData();
  }, [city]);

  if (!forecast) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Title
        level={3}
        style={{
          textAlign: "center",
          color: "#1890ff", // Customize the text color
          fontWeight: "bold", // Add a bold font weight
          fontSize: "24px", // Adjust the font size
          marginBottom: "20px", // Add some bottom margin for spacing
          textTransform: "uppercase", // Convert the text to uppercase
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", // Add a subtle text shadow
        }}>
        Current Weather
      </Title>
      <Row
        gutter={[16, 16]}
        style={{ marginTop: "40px" }}>
        {forecast.map((item, index) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={index}>
            <Card
              style={{ backgroundColor: "#E6E6E6" }}
              title={moment(item.dt_txt).format("DD/MM")}
              bordered={false}>
              {item.weather[0].description === "clear sky" ? (
                <span
                  role="img"
                  aria-label="Clear Sky"
                  style={{ fontSize: "38px" }}>
                  ☀️
                </span>
              ) : item.weather[0].description.includes("rain") ? (
                <span
                  role="img"
                  aria-label="Rain"
                  style={{ fontSize: "38px" }}>
                  🌧️
                </span>
              ) : item.weather[0].description.includes("thunderstorm") ? (
                <span
                  role="img"
                  aria-label="Thunderstorm"
                  style={{ fontSize: "38px" }}>
                  ⛈️
                </span>
              ) : (
                <span
                  role="img"
                  aria-label="Cloudy"
                  style={{ fontSize: "38px" }}>
                  ☁️
                </span>
              )}

              <div>
                <p>
                  <BsThermometer />
                  Temperature:{" "}
                  {convertTemperature(Math.floor(item.main.temp), isFahrenheit)}
                  °{isFahrenheit ? "F" : "C"}
                </p>
                <p>Description: {item.weather[0].description}</p>
                <p>Humidity: {item.main.humidity} %</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FiveDayForecast;
