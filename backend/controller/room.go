package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/B6428549/sa-66-example/entity"
)

// GET /genders
func ListRooms(c *gin.Context) {
	var rooms []entity.Room
	if err := entity.DB().Preload("Roomtype").Preload("Hotel").Raw("SELECT * FROM rooms").Scan(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rooms})
}

func CreateRoom(c *gin.Context) {
	var room entity.Room
	var roomtype entity.Roomtype
	var hotel entity.Hotel
	

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// if err := entity.DB().Where("id = ?", room.GenderID).First(&gender).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Roomtype not found"})
	// 	return
	// }

	// Fetch the corresponding room type
	if err := entity.DB().Where("id = ?", room.RoomtypeID).First(&roomtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Roomtype not found"})
		return
	}

	// Fetch the corresponding hotel
	if err := entity.DB().Where("id = ?", room.HotelID).First(&hotel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Hotel not found"})
		return
	}

	// Create a new room
	newRoom := entity.Room{
		Hotel:     hotel,
		Roomtype:  roomtype,
		Bed:       room.Bed,
		Price:     room.Price,
		Profile:   room.Profile,
		Roomguest: room.Roomguest,
	}

	// Save the room in the database
	if err := entity.DB().Create(&newRoom).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newRoom})
}

// GET /user/:id
func GetRoom(c *gin.Context) {
	var room entity.Room
	id := c.Param("id")
	if err := entity.DB().Preload("Roomtype").Preload("Hotel").Raw("SELECT * FROM rooms WHERE id = ?", id).Find(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": room})
}