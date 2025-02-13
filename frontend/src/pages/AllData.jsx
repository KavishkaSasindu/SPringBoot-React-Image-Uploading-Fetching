import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllData = () => {
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState([]);

  const fetchData = async () => {
    try {
      const vehicleResponse = await axios.get(
        "http://localhost:8080/api/v1/vehicle/getAllVehicles"
      );

      const vehicleList = await vehicleResponse.data;

      const vehicleWithImage = await Promise.all(
        vehicleList?.map(async (vehicle) => {
          const vehicleImageResponse = await axios.get(
            `http://localhost:8080/api/v1/vehicle/oneVehicle/${vehicle.vehicleId}/image`,
            { responseType: "blob" }
          );

          const imageData = URL.createObjectURL(vehicleImageResponse.data);

          return {
            ...vehicle,
            imageData: imageData,
          };
        })
      );

      setVehicle(vehicleWithImage);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex space-x-1 mt-5">
        <button
          className="px-3 py-1 bg-amber-950 text-white shadow-md hover:bg-amber-200 hover:text-black transition"
          onClick={() => navigate("/create")}
        >
          Add Vehicle
        </button>
        <button
          className="px-3 py-1 bg-amber-950 text-white shadow-md hover:bg-amber-200 hover:text-black transition"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      <div className="w-[100%] flex itemx-center justify-center mt-5">
        <table className="table-auto w-[90%]">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Vehicle Name</th>
              <th>Vehicle Model</th>
              <th>Vehicle Image</th>
            </tr>
          </thead>
          <tbody>
            {vehicle?.map((vehicle) => (
              <tr key={vehicle.vehicleId} className="border ">
                <td>{vehicle.vehicleId}</td>
                <td>{vehicle.vehicleName}</td>
                <td>{vehicle.vehicleModel}</td>
                <td>
                  <button
                    className="hover:scale-110 transform transition duration-300"
                    onClick={() => navigate(`/vehicleOne/${vehicle.vehicleId}`)}
                  >
                    <img
                      src={vehicle.imageData}
                      alt={vehicle.vehicleName}
                      width="100px"
                      height="100px"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllData;
