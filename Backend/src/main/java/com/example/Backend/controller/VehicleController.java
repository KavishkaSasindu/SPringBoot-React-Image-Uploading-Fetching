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

import java.util.List;
import java.util.Optional;

@Data
@RestController
@NoArgsConstructor
@RequestMapping("/api/v1/vehicle")
@CrossOrigin(origins = "http://localhost:5173/")
public class VehicleController {

    private VehicleService vehicleService;
    private VehicleRepo vehicleRepo;

    @Autowired
    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

// add data to the controller
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

//  get all vehicles
    @GetMapping("/getAllVehicles")
    public ResponseEntity<?> getALlVehicles() {

        try{
            List<Vehicle> vehicles = vehicleService.getAllVehicles();

            if(vehicles.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Vehicles Found in Database");
            }

            return ResponseEntity.status(HttpStatus.OK).body(vehicles);
        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(("Something went Wrong "+e.getMessage()));
        }
    }

//    get vehicle image by id
    @GetMapping("/oneVehicle/{vehicleId}/image")
    public ResponseEntity<?> getVehicleImage(@PathVariable int vehicleId) {

        Vehicle vehicle = vehicleService.OneVehicle(vehicleId);

        try{
            if(vehicle == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehicle Not Found");
            }

            return ResponseEntity.status(HttpStatus.OK).body(vehicle.getImageData());
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong "+ e.getMessage());
        }

    }

//    get one vehicle Data
    @GetMapping("/oneVehicle/{vehicleId}")
    public ResponseEntity<?> getOneVehicle(@PathVariable int vehicleId) {
        Vehicle vehicle = vehicleService.OneVehicle(vehicleId);
        try{
            if(vehicle == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehicle Not Found");
            }

            return ResponseEntity.status(HttpStatus.OK).body(vehicle);
        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong "+e.getMessage());
        }
    }

//    method to update
    @PutMapping("/updateData/{vehicleId}")
    public ResponseEntity<?> updateVehicle(@RequestPart Vehicle vehicle, @RequestPart MultipartFile image, @PathVariable int vehicleId) {
        try{
            if(vehicle == null) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Please provide input data");
            }

            return ResponseEntity.status(HttpStatus.OK).body(vehicleService.updateVehicle(vehicle,image,vehicleId));
        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong "+e.getMessage());
        }
    }

}
