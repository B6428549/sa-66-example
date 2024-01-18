package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/B6428549/sa-66-example/entity"
)

func CreateBookhotel(c *gin.Context) {
	var bookhotel entity.Bookhotel
	var Room entity.Room
	var Hotel entity.Hotel

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&bookhotel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	
	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", bookhotel.RoomID).First(&Room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", bookhotel.HotelID).First(&Hotel); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	// สร้าง User
	p := entity.Bookhotel{
		Room: Room,
		Hotel: Hotel,
		Name: bookhotel.Name, // ตั้งค่าฟิลด์ Name
		Phone: bookhotel.Phone,
		Email: bookhotel.Email,
		DateIn: bookhotel.DateIn,
		DateOut: bookhotel.DateOut,
	}

	// บันทึก
	if err := entity.DB().Create(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": p})
}



// GET /users
func ListBookhotels(c *gin.Context) {
	var bookhotel []entity.Bookhotel
	if err := entity.DB().Preload("Room").Preload("Hotel").Raw("SELECT * FROM bookhotels").Find(&bookhotel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": bookhotel})
}


// GET /user/:id
func GetBookhotel(c *gin.Context) {
	var bookhotel entity.Bookhotel
	id := c.Param("id")
	if err := entity.DB().Preload("Room").Raw("SELECT * FROM bookhotels WHERE id = ?", id).Find(&bookhotel).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": bookhotel})
}