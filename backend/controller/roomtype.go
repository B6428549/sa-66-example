package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/B6428549/sa-66-example/entity"
)

// GET /genders
func ListRoomtypes(c *gin.Context) {
	var roomtypes []entity.Roomtype
	if err := entity.DB().Raw("SELECT * FROM roomtypes").Scan(&roomtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomtypes})
}