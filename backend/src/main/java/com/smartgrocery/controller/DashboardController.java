package com.smartgrocery.controller;

import com.smartgrocery.dto.ApiResponse;
import com.smartgrocery.dto.DashboardResponse;
import com.smartgrocery.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardResponse>> getSummary(
            @RequestParam(defaultValue = "1") Long userId
    ) {
        DashboardResponse summary = dashboardService.getDashboardSummary(userId);
        return ResponseEntity.ok(ApiResponse.ok("Dashboard data loaded successfully", summary));
    }
}