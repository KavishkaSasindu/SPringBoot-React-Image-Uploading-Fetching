package com.example.Backend.service;

import com.example.Backend.model.Vehicle;
import com.example.Backend.repo.VehicleRepo;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Data
@Service
@NoArgsConstructor
public class VehicleService {

    private VehicleRepo vehicleRepo;
    private Vehicle vehicle;

    @Autowired
    public VehicleService(VehicleRepo vehicleRepo, Vehicle vehicle) {
        this.vehicleRepo = vehicleRepo;
        this.vehicle = vehicle;
    }

//    method to add user with image
    public Vehicle addVehicle(Vehicle vehicle, MultipartFile image) throws IOException {

        if(vehicle == null) {
            return null;
        }
        vehicle.setImageName(image.getOriginalFilename());
        vehicle.setImageType(image.getContentType());
        vehicle.setImageData(image.getBytes());

        return vehicleRepo.save(vehicle);

    }

//    method to findById
    public Vehicle OneVehicle(int id) {
        Optional<Vehicle> vehicle = vehicleRepo.findById(id);
        return vehicle.orElse(null);
    }

//    method to get all vehicle
    public List<Vehicle> getAllVehicles() {

        return vehicleRepo.findAll();

    }

}
