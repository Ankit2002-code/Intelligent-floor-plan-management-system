package com.fpms.FloorPlanManagementSystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.fpms.FloorPlanManagementSystem.service.FloorPlanService;
import com.fpms.FloorPlanManagementSystem.model.FloorDTO;
import com.fpms.FloorPlanManagementSystem.model.UpdateRequestDTO;

@RestController
@RequestMapping("/api/floor-plan")
public class FloorPlanController {

    private final FloorPlanService floorPlanService;

    public FloorPlanController(FloorPlanService floorPlanService) {
        this.floorPlanService = floorPlanService;
    }

   @PostMapping("/update")
public ResponseEntity<String> updateFloorPlan(@RequestBody UpdateRequestDTO updateRequestDTO) {
    if (!"admin".equals(updateRequestDTO.getUsername())) {
        return ResponseEntity.status(403).body("Only admin user can update the floor plan");
    }
    floorPlanService.updateFloorPlan(updateRequestDTO.getUsername(), updateRequestDTO.getVersion(), updateRequestDTO.getFloorDTOs());
    return ResponseEntity.ok("Floor plan updated successfully");
}

    @GetMapping
    public ResponseEntity<List<FloorDTO>> getFloorPlans(
            @RequestParam String username,
            @RequestParam String version) {
        List<FloorDTO> floorDTOs = floorPlanService.getFloorPlans(username, version);
        return ResponseEntity.ok(floorDTOs);
    }

    @GetMapping("/versions")
    public ResponseEntity<java.util.List<String>> getAllVersions() {
        java.util.List<String> versions = floorPlanService.getAllVersions();
        return ResponseEntity.ok(versions);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFloorPlan(@RequestParam String username, @RequestParam String version) {
        if ("admin".equals(username)) {
            boolean deleted = floorPlanService.deleteFloorPlan(version);
            if (deleted) {
                return ResponseEntity.ok("Floor plan deleted successfully");
            } else {
                return ResponseEntity.status(404).body("Floor plan not found");
            }
        } else {
            return ResponseEntity.status(403).body("Only admin user can delete the floor plan");
        }
    }
}

