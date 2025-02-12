package com.example.Backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Entity
@Component
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @Column(unique = true, nullable = false)
    private int vehicleId;
    private String vehicleName;
    private String vehicleType;
    private String vehicleModel;
    private String vehicleColor;
    private String vehicleYear;
    private String imageName;
    private String imageType;
    @Lob
    private String imageData;
}
