package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/B6428549/sa-66-example/entity"
)

// GET /genders
func ListHoteltypes(c *gin.Context) {
	var hoteltypes []entity.Hoteltype
	if err := entity.DB().Raw("SELECT * FROM hoteltypes").Scan(&hoteltypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": hoteltypes})
}