package com.smartgrocery.dto;

import java.math.BigDecimal;

public class DashboardResponse {
    private String userFullName;
    private String userInitials;
    private int inPantryCount;
    private int useSoonCount;
    private int expiredCount;
    private int lowStockCount;

    // Shopping progress
    private String activeShoppingListName;
    private int selectedShoppingItems;
    private int totalShoppingItems;
    private BigDecimal shoppingItemsReadyCost;
    private String nextShopSummary;

    // Budget
    private String budgetMonth;
    private BigDecimal budgetSpent;
    private BigDecimal budgetTotal;
    private BigDecimal budgetRemaining;

    public DashboardResponse() {}

    public String getUserFullName() { return userFullName; }
    public void setUserFullName(String userFullName) { this.userFullName = userFullName; }

    public String getUserInitials() { return userInitials; }
    public void setUserInitials(String userInitials) { this.userInitials = userInitials; }

    public int getInPantryCount() { return inPantryCount; }
    public void setInPantryCount(int inPantryCount) { this.inPantryCount = inPantryCount; }

    public int getUseSoonCount() { return useSoonCount; }
    public void setUseSoonCount(int useSoonCount) { this.useSoonCount = useSoonCount; }

    public int getExpiredCount() { return expiredCount; }
    public void setExpiredCount(int expiredCount) { this.expiredCount = expiredCount; }

    public int getLowStockCount() { return lowStockCount; }
    public void setLowStockCount(int lowStockCount) { this.lowStockCount = lowStockCount; }

    public String getActiveShoppingListName() { return activeShoppingListName; }
    public void setActiveShoppingListName(String activeShoppingListName) { this.activeShoppingListName = activeShoppingListName; }

    public int getSelectedShoppingItems() { return selectedShoppingItems; }
    public void setSelectedShoppingItems(int selectedShoppingItems) { this.selectedShoppingItems = selectedShoppingItems; }

    public int getTotalShoppingItems() { return totalShoppingItems; }
    public void setTotalShoppingItems(int totalShoppingItems) { this.totalShoppingItems = totalShoppingItems; }

    public BigDecimal getShoppingItemsReadyCost() { return shoppingItemsReadyCost; }
    public void setShoppingItemsReadyCost(BigDecimal shoppingItemsReadyCost) { this.shoppingItemsReadyCost = shoppingItemsReadyCost; }

    public String getNextShopSummary() { return nextShopSummary; }
    public void setNextShopSummary(String nextShopSummary) { this.nextShopSummary = nextShopSummary; }

    public String getBudgetMonth() { return budgetMonth; }
    public void setBudgetMonth(String budgetMonth) { this.budgetMonth = budgetMonth; }

    public BigDecimal getBudgetSpent() { return budgetSpent; }
    public void setBudgetSpent(BigDecimal budgetSpent) { this.budgetSpent = budgetSpent; }

    public BigDecimal getBudgetTotal() { return budgetTotal; }
    public void setBudgetTotal(BigDecimal budgetTotal) { this.budgetTotal = budgetTotal; }

    public BigDecimal getBudgetRemaining() { return budgetRemaining; }
    public void setBudgetRemaining(BigDecimal budgetRemaining) { this.budgetRemaining = budgetRemaining; }
}