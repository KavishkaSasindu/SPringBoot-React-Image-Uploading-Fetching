import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [vehicle, setVehicle] = useState([]);

  const fetchAllUserWithImage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/vehicle/getAllVehicles",
        { responseType: "json" }
      );

      const vehicleList = await response.data;
      setVehicle(vehicleList);
      console.log(vehicleList);

      const vehicleWithImage = await Promise.all(
        vehicleList.map(async (vehicle) => {
          try {
            const vehicleImage = await axios.get(
              `http://localhost:8080/api/v1/vehicle/oneVehicle/${vehicle.vehicleId}/image`,
              { responseType: "blob" }
            );

            const imageData = URL.createObjectURL(vehicleImage.data);
            console.log(vehicleImage);
            return { ...vehicle, imageData: imageData };
          } catch (error) {
            console.log(error.message);
          }
        })
      );

      setVehicle(vehicleWithImage);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllUserWithImage();
  }, []);

  return (
    <div>
      <div className="w-[100%] flex itemx-center justify-center mt-5">
        <div className="w-[90%] flex ietms-center justify-center">
          <div className="w-[100%] card-section grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            <div className="card p-4 border">
              {vehicle.map((vehicle) => (
                <div key={vehicle.vehicleId}>
                  <img
                    src={vehicle.imageData}
                    alt="image"
                    className="w-[300px] h-[250px] border shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
