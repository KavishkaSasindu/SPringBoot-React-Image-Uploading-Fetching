import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const naviget = useNavigate();

  const [vehicle, setVehicle] = useState([]);

  const fetchAllUserWithImage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/vehicle/getAllVehicles",
        { responseType: "json" }
      );

      const vehicleList = await response.data;
      console.log(vehicleList);

      const vehicleWithImage = await Promise.all(
        vehicleList?.map(async (vehicle) => {
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
          <div className="w-[100%] card-section ">
            <div className="flex space-x-1">
              <button
                className="px-3 py-1 bg-amber-950 text-white shadow-md hover:bg-amber-200 hover:text-black transition"
                onClick={() => navigate("/create")}
              >
                Add Vehicle
              </button>
              <button
                className="px-3 py-1 bg-amber-950 text-white shadow-md hover:bg-amber-200 hover:text-black transition"
                onClick={() => navigate("/allData")}
              >
                List of Data
              </button>
            </div>
            <div className="card p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {vehicle?.map((vehicle) => (
                <div className="bg-white shadow-md p-4" key={vehicle.vehicleId}>
                  {/* Vehicle Image */}
                  <img
                    src={vehicle.imageData}
                    alt={vehicle.vehicleName}
                    className="w-full h-48 object-cover "
                  />

                  {/* Vehicle Details */}
                  <div className="mt-3 space-y-2">
                    <h3 className="text-lg font-semibold text-center">
                      {vehicle.vehicleName}
                    </h3>

                    <p className="text-gray-600">
                      <strong>Type:</strong> {vehicle.vehicleType}
                    </p>
                    <p className="text-gray-600">
                      <strong>Model:</strong> {vehicle.vehicleModel}
                    </p>
                    <p className="text-gray-600">
                      <strong>Color:</strong> {vehicle.vehicleColor}
                    </p>
                    <p className="text-gray-600">
                      <strong>Year:</strong> {vehicle.vehicleYear}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={() =>
                        naviget(`/vehicleOne/${vehicle.vehicleId}`)
                      }
                      className="bg-blue-700 text-white px-4 py-2 hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                    <button className="bg-green-700 text-white px-4 py-2 hover:bg-green-600 transition">
                      Update
                    </button>
                  </div>
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
