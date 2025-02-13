import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewOneData = () => {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState({
    vehicleId: "",
    vehicleName: "",
    vehicleType: "",
    vehicleBrand: "",
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
      <img src={image} alt={vehicle.imageName} />
    </div>
  );
};

export default ViewOneData;
