package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("Hotel.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(
		
		&User{},
		&Gender{},
		&Hoteltype{},
		&Hotel{},
		&Room{},
		&Roomtype{},
	)

	db = database

	// // Gender Data
	// male := Gender{
	// 	Name: "ชาย",
	// }
	// db.Model(&Gender{}).Create(&male)

	// female := Gender{
	// 	Name: "หญิง",
	// }
	// db.Model(&Gender{}).Create(&female)
		
	// hotel := Hoteltype{
	// 	Name: "Hotel",
	// }
	// db.Model(&Hoteltype{}).Create(&hotel)
	// resort := Hoteltype{
	// 	Name: "Resort",
	// }
	// db.Model(&Hoteltype{}).Create(&resort)
	// villa := Hoteltype{
	// 	Name: "Villa",
	// }
	// db.Model(&Hoteltype{}).Create(&villa)
	// apartment := Hoteltype{
	// 	Name: "Apartment",
	// }
	// db.Model(&Hoteltype{}).Create(&apartment)
	// tent := Hoteltype{
	// 	Name: "Tent",
	// }
	// db.Model(&Hoteltype{}).Create(&tent)
	// //Gender Data
	
	// // ------------------------------
	// standard := Roomtype{
	// 	Name: "Standard",
	// }
	// db.Model(&Roomtype{}).Create(&standard)
	// superior := Roomtype{
	// 	Name: "Superior ",
	// }
	// db.Model(&Roomtype{}).Create(&superior)
	// deluxe := Roomtype{
	// 	Name: "Deluxe",
	// }
	// db.Model(&Roomtype{}).Create(&deluxe)
	// suite := Roomtype{
	// 	Name: "Suite",
	// }
	// db.Model(&Roomtype{}).Create(&suite)	
	// tent2 := Roomtype{
	// 	Name: "Tent 2 Adults",
	// }
	// db.Model(&Roomtype{}).Create(&tent2)	
	// tent4 := Roomtype{
	// 	Name: "Tent 4 Adults",
	// }
	// db.Model(&Roomtype{}).Create(&tent4)	
	// //------------------------------
}