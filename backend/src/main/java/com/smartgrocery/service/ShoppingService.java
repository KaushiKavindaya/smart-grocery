package com.smartgrocery.service;

import com.smartgrocery.dto.ShoppingDtos.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class ShoppingService {

    private final JdbcTemplate jdbcTemplate;

    public ShoppingService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ShoppingListSummaryDto> getShoppingLists(Long userId, String typeFilter) {
        String sql = "SELECT l.id, l.title, l.list_type, l.store_name, l.scheduled_date, " +
                "COALESCE(SUM(i.estimated_price), 0) AS total_cost, " +
                "COUNT(i.id) AS total_items, " +
                "COALESCE(SUM(CASE WHEN i.is_purchased = TRUE THEN 1 ELSE 0 END), 0) AS selected_items " +
                "FROM shopping_lists l " +
                "LEFT JOIN shopping_items i ON l.id = i.shopping_list_id " +
                "WHERE l.user_id = ? " +
                (typeFilter != null && !typeFilter.equalsIgnoreCase("All") ? "AND l.list_type = ? " : "") +
                "GROUP BY l.id, l.title, l.list_type, l.store_name, l.scheduled_date";

        Object[] params = (typeFilter != null && !typeFilter.equalsIgnoreCase("All"))
                ? new Object[]{userId, typeFilter}
                : new Object[]{userId};

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            ShoppingListSummaryDto dto = new ShoppingListSummaryDto();
            dto.setId(rs.getLong("id"));
            dto.setTitle(rs.getString("title"));
            dto.setListType(rs.getString("list_type"));
            dto.setStoreName(rs.getString("store_name"));
            dto.setScheduledDate(rs.getString("scheduled_date"));
            dto.setTotalCost(rs.getBigDecimal("total_cost"));
            dto.setTotalItems(rs.getInt("total_items"));
            dto.setSelectedItems(rs.getInt("selected_items"));
            return dto;
        }, params);
    }

    public ShoppingListDetailDto getListDetails(Long listId) {
        String listSql = "SELECT id, title, store_name, shared_with FROM shopping_lists WHERE id = ?";
        ShoppingListDetailDto dto = jdbcTemplate.queryForObject(listSql, (rs, rowNum) -> {
            ShoppingListDetailDto d = new ShoppingListDetailDto();
            d.setId(rs.getLong("id"));
            d.setTitle(rs.getString("title"));
            d.setStoreName(rs.getString("store_name"));
            d.setSharedWith(rs.getString("shared_with"));
            return d;
        }, listId);

        if (dto == null) return null;

        String itemsSql = "SELECT id, product_id, name, category, quantity, unit, specification, estimated_price, note, image_url, is_purchased " +
                "FROM shopping_items WHERE shopping_list_id = ?";

        List<ShoppingItemDto> items = jdbcTemplate.query(itemsSql, (rs, rowNum) -> {
            ShoppingItemDto item = new ShoppingItemDto();
            item.setId(rs.getLong("id"));
            item.setProductId(rs.getObject("product_id") != null ? rs.getLong("product_id") : null);
            item.setName(rs.getString("name"));
            item.setCategory(rs.getString("category"));
            item.setQuantity(rs.getBigDecimal("quantity"));
            item.setUnit(rs.getString("unit"));
            item.setSpecification(rs.getString("specification"));
            item.setEstimatedPrice(rs.getBigDecimal("estimated_price"));
            item.setNote(rs.getString("note"));
            item.setImageUrl(rs.getString("image_url"));
            item.setPurchased(rs.getBoolean("is_purchased"));
            return item;
        }, listId);

        dto.setItems(items);
        dto.setTotalItems(items.size());

        BigDecimal total = BigDecimal.ZERO;
        BigDecimal selected = BigDecimal.ZERO;
        int selectedCount = 0;

        for (ShoppingItemDto item : items) {
            total = total.add(item.getEstimatedPrice());
            if (item.isPurchased()) {
                selected = selected.add(item.getEstimatedPrice());
                selectedCount++;
            }
        }

        dto.setTotalCost(total);
        dto.setSelectedCost(selected);
        dto.setSelectedItems(selectedCount);

        return dto;
    }

    public void toggleItemPurchased(Long itemId) {
        jdbcTemplate.update("UPDATE shopping_items SET is_purchased = NOT is_purchased WHERE id = ?", itemId);
    }

    public void updateItem(Long itemId, UpdateItemRequest req) {
        jdbcTemplate.update(
                "UPDATE shopping_items SET quantity = ?, unit = ?, estimated_price = ?, note = ? WHERE id = ?",
                req.getQuantity(), req.getUnit(), req.getEstimatedPrice(), req.getNote(), itemId
        );
    }

    public void deleteItem(Long itemId) {
        jdbcTemplate.update("DELETE FROM shopping_items WHERE id = ?", itemId);
    }

    public void addItemToList(Long listId, String name, String category, BigDecimal price, String imageUrl) {
        jdbcTemplate.update(
                "INSERT INTO shopping_items (shopping_list_id, name, category, quantity, unit, specification, estimated_price, image_url, is_purchased) " +
                        "VALUES (?, ?, ?, 1, 'Carton', '1 L', ?, ?, FALSE)",
                listId, name, category, price, imageUrl
        );
    }

    @Transactional
    public Long createCustomListWithProduct(CreateCustomListRequest req) {
        jdbcTemplate.update(
                "INSERT INTO shopping_lists (user_id, title, list_type, scheduled_date, store_name) VALUES (?, ?, ?, ?, 'Custom Store')",
                req.getUserId() != null ? req.getUserId() : 1L, req.getListName(), req.getListType(), req.getShoppingDate()
        );

        Long listId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Long.class);

        if (req.getProductName() != null && !req.getProductName().trim().isEmpty()) {
            jdbcTemplate.update(
                    "INSERT INTO shopping_items (shopping_list_id, name, quantity, unit, specification, estimated_price, is_purchased) " +
                            "VALUES (?, ?, 1, 'bag', ?, ?, FALSE)",
                    listId, req.getProductName(), req.getQuantitySpec(), req.getEstimatedPrice()
            );
        }
        return listId;
    }

    @Transactional
    public void confirmPurchaseAndUpdatePantry(Long listId) {
        // Find selected items
        String sql = "SELECT id, product_id, name, quantity, estimated_price FROM shopping_items WHERE shopping_list_id = ? AND is_purchased = TRUE";
        List<ShoppingItemDto> purchasedItems = jdbcTemplate.query(sql, (rs, i) -> {
            ShoppingItemDto item = new ShoppingItemDto();
            item.setId(rs.getLong("id"));
            item.setProductId(rs.getObject("product_id") != null ? rs.getLong("product_id") : null);
            item.setName(rs.getString("name"));
            item.setQuantity(rs.getBigDecimal("quantity"));
            item.setEstimatedPrice(rs.getBigDecimal("estimated_price"));
            return item;
        }, listId);

        LocalDate today = LocalDate.now();
        LocalDate expiryDate = today.plusDays(7); // Default 7 days shelf-life for demo

        for (ShoppingItemDto item : purchasedItems) {
            Long productId = item.getProductId();
            if (productId == null) {
                // If custom product, insert into products table first
                jdbcTemplate.update("INSERT INTO products (user_id, name, category, total_quantity, min_stock_level) VALUES (1, ?, 'General', ?, 1)",
                        item.getName(), item.getQuantity());
                productId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Long.class);
            } else {
                // Increment product stock
                jdbcTemplate.update("UPDATE products SET total_quantity = total_quantity + ? WHERE id = ?",
                        item.getQuantity(), productId);
            }

            // Create inventory batch with expiry
            jdbcTemplate.update("INSERT INTO inventory_batches (product_id, quantity, unit_price, expiry_date, purchase_date) VALUES (?, ?, ?, ?, ?)",
                    productId, item.getQuantity(), item.getEstimatedPrice(), expiryDate, today);
        }
    }
}