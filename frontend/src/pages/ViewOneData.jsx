import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewOneData = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState({
    vehicleId: "",
    vehicleName: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    imageName: "",
  });
  const [image, setImage] = useState(null);

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/vehicle/oneVehicle/${id}`,
        { responseType: "json" }
      );

      const vehicleData = await response.data;

      console.log(vehicleData);

      const imageResponse = await axios.get(
        `http://localhost:8080/api/v1/vehicle/oneVehicle/${id}/image`,
        { responseType: "blob" }
      );

      const imageData = URL.createObjectURL(imageResponse.data);

      console.log(imageResponse.data);

      setImage(imageData);

      setVehicle(vehicleData);
    } catch (error) {
      console.log(error, message);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <div>
      <div>View One Data</div>
      <div className="flex space-x-1 mt-5 mb-5">
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
      <img src={image} alt={vehicle.imageName} />
      Name : {vehicle.vehicleName} <br />
      Type : {vehicle.vehicleType} <br />
      Color : {vehicle.vehicleColor} <br />
      Brand : {vehicle.vehicleModel}
    </div>
  );
};

export default ViewOneData;
