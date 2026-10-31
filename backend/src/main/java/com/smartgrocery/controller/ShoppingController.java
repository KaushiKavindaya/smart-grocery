package com.smartgrocery.controller;

import com.smartgrocery.dto.ApiResponse;
import com.smartgrocery.dto.ShoppingDtos.*;
import com.smartgrocery.service.ShoppingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/shopping")
public class ShoppingController {

    private final ShoppingService shoppingService;

    public ShoppingController(ShoppingService shoppingService) {
        this.shoppingService = shoppingService;
    }

    @GetMapping("/lists")
    public ResponseEntity<ApiResponse<List<ShoppingListSummaryDto>>> getShoppingLists(
            @RequestParam(defaultValue = "1") Long userId,
            @RequestParam(required = false, defaultValue = "All") String type
    ) {
        List<ShoppingListSummaryDto> lists = shoppingService.getShoppingLists(userId, type);
        return ResponseEntity.ok(ApiResponse.ok("Shopping lists fetched", lists));
    }

    @GetMapping("/lists/{id}")
    public ResponseEntity<ApiResponse<ShoppingListDetailDto>> getListDetails(@PathVariable Long id) {
        ShoppingListDetailDto details = shoppingService.getListDetails(id);
        return ResponseEntity.ok(ApiResponse.ok("List details fetched", details));
    }

    @PutMapping("/items/{itemId}/toggle")
    public ResponseEntity<ApiResponse<String>> toggleItem(@PathVariable Long itemId) {
        shoppingService.toggleItemPurchased(itemId);
        return ResponseEntity.ok(ApiResponse.ok("Item toggled successfully", null));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<String>> updateItem(
            @PathVariable Long itemId,
            @RequestBody UpdateItemRequest request
    ) {
        shoppingService.updateItem(itemId, request);
        return ResponseEntity.ok(ApiResponse.ok("Item updated successfully", null));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<String>> deleteItem(@PathVariable Long itemId) {
        shoppingService.deleteItem(itemId);
        return ResponseEntity.ok(ApiResponse.ok("Item removed from list", null));
    }

    @PostMapping("/lists/{id}/items")
    public ResponseEntity<ApiResponse<String>> addItem(
            @PathVariable Long id,
            @RequestBody Map<String, Object> payload
    ) {
        String name = (String) payload.get("name");
        String category = (String) payload.getOrDefault("category", "General");
        BigDecimal price = new BigDecimal(payload.getOrDefault("price", "2.10").toString());
        String imageUrl = (String) payload.get("imageUrl");

        shoppingService.addItemToList(id, name, category, price, imageUrl);
        return ResponseEntity.ok(ApiResponse.ok("Item added to list", null));
    }

    @PostMapping("/lists/custom")
    public ResponseEntity<ApiResponse<Long>> createCustomList(@RequestBody CreateCustomListRequest req) {
        Long id = shoppingService.createCustomListWithProduct(req);
        return ResponseEntity.ok(ApiResponse.ok("Custom list created successfully", id));
    }

    @PostMapping("/lists/{id}/confirm-purchase")
    public ResponseEntity<ApiResponse<String>> confirmPurchase(@PathVariable Long id) {
        shoppingService.confirmPurchaseAndUpdatePantry(listId(id));
        return ResponseEntity.ok(ApiResponse.ok("Pantry updated with purchased batches", null));
    }

    private Long listId(Long id) { return id; }
}