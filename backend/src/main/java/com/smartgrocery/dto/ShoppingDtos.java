package com.smartgrocery.dto;

import java.math.BigDecimal;
import java.util.List;

public class ShoppingDtos {

    public static class ShoppingListSummaryDto {
        private Long id;
        private String title;
        private String listType;
        private String storeName;
        private String scheduledDate;
        private BigDecimal totalCost;
        private int totalItems;
        private int selectedItems;

        public ShoppingListSummaryDto() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getListType() { return listType; }
        public void setListType(String listType) { this.listType = listType; }
        public String getStoreName() { return storeName; }
        public void setStoreName(String storeName) { this.storeName = storeName; }
        public String getScheduledDate() { return scheduledDate; }
        public void setScheduledDate(String scheduledDate) { this.scheduledDate = scheduledDate; }
        public BigDecimal getTotalCost() { return totalCost; }
        public void setTotalCost(BigDecimal totalCost) { this.totalCost = totalCost; }
        public int getTotalItems() { return totalItems; }
        public void setTotalItems(int totalItems) { this.totalItems = totalItems; }
        public int getSelectedItems() { return selectedItems; }
        public void setSelectedItems(int selectedItems) { this.selectedItems = selectedItems; }
    }

    public static class ShoppingItemDto {
        private Long id;
        private Long productId;
        private String name;
        private String category;
        private BigDecimal quantity;
        private String unit;
        private String specification;
        private BigDecimal estimatedPrice;
        private String note;
        private String imageUrl;
        private boolean isPurchased;

        public ShoppingItemDto() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public BigDecimal getQuantity() { return quantity; }
        public void setQuantity(BigDecimal quantity) { this.quantity = quantity; }
        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }
        public String getSpecification() { return specification; }
        public void setSpecification(String specification) { this.specification = specification; }
        public BigDecimal getEstimatedPrice() { return estimatedPrice; }
        public void setEstimatedPrice(BigDecimal estimatedPrice) { this.estimatedPrice = estimatedPrice; }
        public String getNote() { return note; }
        public void setNote(String note) { this.note = note; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public boolean isPurchased() { return isPurchased; }
        public void setPurchased(boolean purchased) { isPurchased = purchased; }
    }

    public static class ShoppingListDetailDto {
        private Long id;
        private String title;
        private String storeName;
        private String sharedWith;
        private BigDecimal totalCost;
        private BigDecimal selectedCost;
        private int totalItems;
        private int selectedItems;
        private List<ShoppingItemDto> items;

        public ShoppingListDetailDto() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getStoreName() { return storeName; }
        public void setStoreName(String storeName) { this.storeName = storeName; }
        public String getSharedWith() { return sharedWith; }
        public void setSharedWith(String sharedWith) { this.sharedWith = sharedWith; }
        public BigDecimal getTotalCost() { return totalCost; }
        public void setTotalCost(BigDecimal totalCost) { this.totalCost = totalCost; }
        public BigDecimal getSelectedCost() { return selectedCost; }
        public void setSelectedCost(BigDecimal selectedCost) { this.selectedCost = selectedCost; }
        public int getTotalItems() { return totalItems; }
        public void setTotalItems(int totalItems) { this.totalItems = totalItems; }
        public int getSelectedItems() { return selectedItems; }
        public void setSelectedItems(int selectedItems) { this.selectedItems = selectedItems; }
        public List<ShoppingItemDto> getItems() { return items; }
        public void setItems(List<ShoppingItemDto> items) { this.items = items; }
    }

    public static class CreateCustomListRequest {
        private Long userId;
        private String listName;
        private String listType;
        private String shoppingDate;
        private String productName;
        private String quantitySpec;
        private BigDecimal estimatedPrice;

        public CreateCustomListRequest() {}

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getListName() { return listName; }
        public void setListName(String listName) { this.listName = listName; }
        public String getListType() { return listType; }
        public void setListType(String listType) { this.listType = listType; }
        public String getShoppingDate() { return shoppingDate; }
        public void setShoppingDate(String shoppingDate) { this.shoppingDate = shoppingDate; }
        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }
        public String getQuantitySpec() { return quantitySpec; }
        public void setQuantitySpec(String quantitySpec) { this.quantitySpec = quantitySpec; }
        public BigDecimal getEstimatedPrice() { return estimatedPrice; }
        public void setEstimatedPrice(BigDecimal estimatedPrice) { this.estimatedPrice = estimatedPrice; }
    }

    public static class UpdateItemRequest {
        private BigDecimal quantity;
        private String unit;
        private BigDecimal estimatedPrice;
        private String note;

        public UpdateItemRequest() {}

        public BigDecimal getQuantity() { return quantity; }
        public void setQuantity(BigDecimal quantity) { this.quantity = quantity; }
        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }
        public BigDecimal getEstimatedPrice() { return estimatedPrice; }
        public void setEstimatedPrice(BigDecimal estimatedPrice) { this.estimatedPrice = estimatedPrice; }
        public String getNote() { return note; }
        public void setNote(String note) { this.note = note; }
    }
}