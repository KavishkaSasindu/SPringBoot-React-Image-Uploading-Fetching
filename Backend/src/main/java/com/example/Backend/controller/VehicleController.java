package com.example.Backend.controller;

import com.example.Backend.model.Vehicle;
import com.example.Backend.repo.VehicleRepo;
import com.example.Backend.service.VehicleService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Data
@RestController
@NoArgsConstructor
@RequestMapping("/api/v1/vehicle")
public class VehicleController {

    private VehicleService vehicleService;
    private VehicleRepo vehicleRepo;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }


    @PostMapping("/addVehicle")
    public ResponseEntity<?> addVehicle(@RequestPart Vehicle vehicle, @RequestPart MultipartFile image) {
        try{
            Vehicle vehicle1 = vehicleService.OneVehicle(vehicle.getVehicleId());
            if(vehicle1 == null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.addVehicle(vehicle,image));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Vehicle already exists");

        }catch(Exception e){
            return ResponseEntity.status(500).body("Something went wrong "+e.getMessage());
        }
    }

}
