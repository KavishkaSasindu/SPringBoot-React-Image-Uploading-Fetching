import axios from "axios";
import React, { useEffect, useState } from "react";

const AllData = () => {
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
      <div>Fetching All Data</div>

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
                  <img
                    src={vehicle.imageData}
                    alt={vehicle.vehicleName}
                    width="100px"
                    height="100px"
                  />
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
