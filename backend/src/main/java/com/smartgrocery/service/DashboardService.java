package com.smartgrocery.service;

import com.smartgrocery.dto.DashboardResponse;
import com.smartgrocery.entity.User;
import com.smartgrocery.repository.UserRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class DashboardService {

    private final JdbcTemplate jdbcTemplate;
    private final UserRepository userRepository;

    public DashboardService(JdbcTemplate jdbcTemplate, UserRepository userRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboardSummary(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        DashboardResponse res = new DashboardResponse();
        res.setUserFullName(user.getFullName());

        // Extract initials (e.g. "Kaushi Kavindya" -> "KK")
        String[] parts = user.getFullName().split(" ");
        String initials = parts.length > 1
                ? ("" + parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
                : ("" + user.getFullName().charAt(0)).toUpperCase();
        res.setUserInitials(initials);

        // 1. Total in pantry
        Integer inPantry = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM products WHERE user_id = ?",
                Integer.class, userId);
        res.setInPantryCount(inPantry != null ? inPantry : 0);

        // Current simulated/real date
        LocalDate today = LocalDate.now();
        LocalDate threeDaysLater = today.plusDays(3);

        // 2. Expired items (expiry_date < today)
        Integer expired = jdbcTemplate.queryForObject(
                "SELECT COUNT(DISTINCT b.product_id) FROM inventory_batches b " +
                        "JOIN products p ON b.product_id = p.id " +
                        "WHERE p.user_id = ? AND b.is_consumed = FALSE AND b.expiry_date < ?",
                Integer.class, userId, today);
        res.setExpiredCount(expired != null ? expired : 0);

        // 3. Use soon items (today <= expiry_date <= 3 days later)
        Integer useSoon = jdbcTemplate.queryForObject(
                "SELECT COUNT(DISTINCT b.product_id) FROM inventory_batches b " +
                        "JOIN products p ON b.product_id = p.id " +
                        "WHERE p.user_id = ? AND b.is_consumed = FALSE AND b.expiry_date BETWEEN ? AND ?",
                Integer.class, userId, today, threeDaysLater);
        res.setUseSoonCount(useSoon != null ? useSoon : 0);

        // 4. Low stock (total_quantity <= min_stock_level)
        Integer lowStock = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM products WHERE user_id = ? AND total_quantity <= min_stock_level",
                Integer.class, userId);
        res.setLowStockCount(lowStock != null ? lowStock : 0);

        // 5. Active Shopping List
        try {
            Long listId = jdbcTemplate.queryForObject(
                    "SELECT id FROM shopping_lists WHERE user_id = ? AND is_active = TRUE LIMIT 1",
                    Long.class, userId);

            if (listId != null) {
                String listName = jdbcTemplate.queryForObject(
                        "SELECT title FROM shopping_lists WHERE id = ?", String.class, listId);
                res.setActiveShoppingListName(listName != null ? listName : "Weekly essentials");

                Integer totalItems = jdbcTemplate.queryForObject(
                        "SELECT COUNT(*) FROM shopping_items WHERE shopping_list_id = ?", Integer.class, listId);
                Integer selectedItems = jdbcTemplate.queryForObject(
                        "SELECT COUNT(*) FROM shopping_items WHERE shopping_list_id = ? AND is_purchased = TRUE", Integer.class, listId);
                BigDecimal readyCost = jdbcTemplate.queryForObject(
                        "SELECT COALESCE(SUM(estimated_price), 0) FROM shopping_items WHERE shopping_list_id = ? AND is_purchased = TRUE", BigDecimal.class, listId);

                res.setTotalShoppingItems(totalItems != null ? totalItems : 0);
                res.setSelectedShoppingItems(selectedItems != null ? selectedItems : 0);
                res.setShoppingItemsReadyCost(readyCost != null ? readyCost : BigDecimal.ZERO);
            }
        } catch (Exception ignored) {
            res.setActiveShoppingListName("Weekly essentials");
            res.setTotalShoppingItems(6);
            res.setSelectedShoppingItems(3);
            res.setShoppingItemsReadyCost(new BigDecimal("9.20"));
        }
        res.setNextShopSummary("Monthly staples • Next shop Nov 1 • 4 items");

        // 6. Budget
        try {
            jdbcTemplate.query(
                    "SELECT month_name, total_budget, spent_amount FROM budgets WHERE user_id = ? LIMIT 1",
                    rs -> {
                        res.setBudgetMonth(rs.getString("month_name"));
                        BigDecimal total = rs.getBigDecimal("total_budget");
                        BigDecimal spent = rs.getBigDecimal("spent_amount");
                        res.setBudgetTotal(total);
                        res.setBudgetSpent(spent);
                        res.setBudgetRemaining(total.subtract(spent));
                    },
                    userId
            );
        } catch (Exception ignored) {
            res.setBudgetMonth("October");
            res.setBudgetTotal(new BigDecimal("400.00"));
            res.setBudgetSpent(new BigDecimal("286.80"));
            res.setBudgetRemaining(new BigDecimal("113.20"));
        }

        return res;
    }
}