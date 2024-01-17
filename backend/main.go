package main

import (
	"github.com/gin-gonic/gin"
	"github.com/B6428549/sa-66-example/controller"
	"github.com/B6428549/sa-66-example/entity"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// hotel Routes
	r.GET("/users", controller.ListUsers)
	r.GET("/user/:id", controller.GetUser)
	r.POST("/users", controller.CreateUser)
	r.PATCH("/users", controller.UpdateUser)
	r.DELETE("/users/:id", controller.DeleteUser)
	// Gender Routes
	r.GET("/genders", controller.ListGenders)
	r.GET("/hotels", controller.ListHotels)
	// r.GET("/hotel/:id", controller.GetHotel)
	r.POST("/hotels", controller.CreateHotel)
	r.GET("/hotel/:id", controller.GetHotel)
	r.PATCH("/hotels", controller.UpdateHotel)
	// r.PATCH("/hotels", controller.UpdateHotel)
	r.DELETE("/hotels/:id", controller.DeleteHotel)
	// Gender Routes
	r.GET("/hoteltypes", controller.ListHoteltypes)
	// Run the server
	r.GET("/roomtypes", controller.ListRoomtypes)
	// // Run the server
	r.GET("/room/:id", controller.GetRoom)
	r.GET("/rooms", controller.ListRooms)
	r.POST("/rooms", controller.CreateRoom)
	// Run the server
	r.GET("/bookhotels", controller.ListBookhotels)
	r.POST("/bookhotels", controller.CreateBookhotel)
	r.GET("/bookhotel/:id", controller.GetBookhotel)

	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
