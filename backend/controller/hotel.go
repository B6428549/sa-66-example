package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/B6428549/sa-66-example/entity"
)

func CreateHotel(c *gin.Context) {
	var hotel entity.Hotel
	var hoteltype entity.Hoteltype

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&hotel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	
	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", hotel.HoteltypeID).First(&hoteltype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "hotel not found"})
		return
	}

	// สร้าง User
	p := entity.Hotel{
		Hoteltype: hoteltype,
		Name: hotel.Name, // ตั้งค่าฟิลด์ Name
		Location: hotel.Location,
		Price: hotel.Price,
		Profile: hotel.Profile,	
		Guest: hotel.Guest,
		Description: hotel.Description,
		Hotelclass: hotel.Hotelclass,
	}

	// บันทึก
	if err := entity.DB().Create(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": p})
}



// GET /users
func ListHotels(c *gin.Context) {
	var hotels []entity.Hotel
	if err := entity.DB().Preload("Hoteltype").Raw("SELECT * FROM hotels").Find(&hotels).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": hotels})
}


// GET /user/:id
func GetHotel(c *gin.Context) {
	var hotel entity.Hotel
	id := c.Param("id")
	if err := entity.DB().Preload("Hoteltype").Raw("SELECT * FROM hotels WHERE id = ?", id).Find(&hotel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": hotel})
}


// DELETE /users/:id
func DeleteHotel(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM hotels WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateHotel(c *gin.Context) {
	var input entity.Hotel

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var existingHotel entity.Hotel
	if tx := entity.DB().Where("id = ?", input.ID).First(&existingHotel); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "hotel not found"})
		return
	}

	// Update only specific fields
	existingHotel.Name = input.Name
	existingHotel.Location = input.Location
	existingHotel.Price = input.Price
	existingHotel.Guest = input.Guest
	existingHotel.Description = input.Description
	existingHotel.Hotelclass = input.Hotelclass

	if err := entity.DB().Save(&existingHotel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": existingHotel})
}
