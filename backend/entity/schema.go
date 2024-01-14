package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName string
	LastName  string
	Email     string
	Phone     string
	Profile   string `gorm:"type:longtext"`

	// GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	HoteltypeID *uint
	Hoteltype   Hoteltype `gorm:"references:id"`
}

type Gender struct {
	gorm.Model
	Name string
	User []User `gorm:"foreignKey:GenderID"`
}

type Hoteltype struct {
	gorm.Model
	Name string
	Hotel []Hotel `gorm:"foreignKey:HoteltypeID"`
	User []User `gorm:"foreignKey:HoteltypeID"`
}

type Hotel struct {
	gorm.Model
	Name  string
    Location string
	Profile   string `gorm:"type:longtext"`
	Hotelclass string
	NumberofRoom string
	Description string
	Guest string
	

	
    HoteltypeID  *uint // or *uint based on requirements
    Hoteltype    Hoteltype `gorm:"foreignKey:HoteltypeID"`

	// Room []Room `gorm:"foreignKey:HotelID"`
	// clear
}

type Room struct {
	gorm.Model
	Bed string
	Price string
	Profile   string `gorm:"type:longtext"`

	
	RoomtypeID *uint
	Roomtype  Roomtype `gorm:"references:id"`

	HotelID *uint
	Hotel  Hotel `gorm:"references:id"`
	// clear

}

type Roomtype struct {
	gorm.Model
	Name string		

	Room []Room `gorm:"foreignKey:RoomtypeID"`
	// clear
}
