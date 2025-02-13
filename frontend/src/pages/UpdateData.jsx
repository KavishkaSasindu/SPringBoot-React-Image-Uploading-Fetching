import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateData = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [vehicle, setVehicle] = useState({});

  const [getId, setId] = useState(id);

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const updaetData = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "vehicle",
        new Blob([JSON.stringify(vehicle)], { type: "application/json" })
      );
      formData.append("image", image);
      formData.append("vehicleId", getId);

      const response = await axios.put(
        `http://localhost:8080/api/v1/vehicle/updateData/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setVehicle(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-5">
        <div className=" shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Add New Vehicle
          </h2>

          <button
            className="px-3 py-1 bg-cyan-950 text-white hover:bg-cyan-300 hover:text-black transition mb-4"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <form className="space-y-4" onSubmit={updaetData}>
            <div>
              <label className="block text-gray-700 font-medium">
                Vehicle ID
              </label>
              <input
                type="Number"
                name="vehicleId"
                disabled
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            {/* Vehicle Name */}
            <div>
              <label className="block text-gray-700 font-medium">
                Vehicle Name
              </label>
              <input
                type="text"
                name="vehicleName"
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-gray-700 font-medium">
                Vehicle Type
              </label>
              <input
                type="text"
                name="vehicleType"
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Vehicle Model */}
            <div>
              <label className="block text-gray-700 font-medium">
                Vehicle Model
              </label>
              <input
                type="text"
                name="vehicleModel"
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Vehicle Color */}
            <div>
              <label className="block text-gray-700 font-medium">
                Vehicle Color
              </label>
              <input
                type="text"
                name="vehicleColor"
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Vehicle Year */}
            <div>
              <label className="block text-gray-700 font-medium">
                Vehicle Year
              </label>
              <input
                type="text"
                name="vehicleYear"
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium">
                Upload Image
              </label>
              <input
                type="file"
                onChange={handleImage}
                required
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Update Vehicle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateData;
