package entity

import (
	"time"

	"gorm.io/gorm"

	"github.com/lib/pq"
	_ "github.com/lib/pq"
)

type User struct {
	gorm.Model
	FirstName string `valid:"required~FirstName is required"`
	LastName  string `valid:"required~LastName is required"`
	Email     string `valid:"required~Email is required, email~Email is invalid"`
	Phone     string `valid:"required~Phone is required, stringlength(10|10)"`
	Profile   string `gorm:"type:longtext" valid:"required~Profile is required"`

	// GenderID ทำหน้าที่เป็น FK
	GenderID *uint  `valid:"required~Gender is required"`
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
	Name  string
	Hotel []Hotel `gorm:"foreignKey:HoteltypeID"`
	User  []User  `gorm:"foreignKey:HoteltypeID"`
}

type Hotel struct {
	gorm.Model
	Name        string
	Location    string
	Profile     string `gorm:"type:longtext"`
	Hotelclass  int
	Price       int
	Description string
	Guest       int
	Service     pq.StringArray `gorm:"type:text[]"`

	HoteltypeID *uint     // or *uint based on requirements
	Hoteltype   Hoteltype `gorm:"foreignKey:HoteltypeID"`

	Room []Room `gorm:"foreignKey:HotelID"`

	Bookhotel []Bookhotel `gorm:"foreignKey:HotelID"`
	// clear
}

type Room struct {
	gorm.Model
	Bed       int
	Price     int
	Roomguest int
	Profile   string `gorm:"type:longtext"`

	RoomtypeID *uint
	Roomtype   Roomtype `gorm:"references:id"`

	HotelID *uint
	Hotel   Hotel `gorm:"references:id"`

	// clear

	Bookhotel []Bookhotel `gorm:"foreignKey:RoomID"`
}

type Roomtype struct {
	gorm.Model
	Name string

	Room []Room `gorm:"foreignKey:RoomtypeID"`
	// clear
}

type Bookhotel struct {
	gorm.Model
	DateIn  time.Time
	DateOut time.Time
	Name    string
	Phone   string
	Email   string
	Price   int

	// UserID *uint
	// User   User `gorm:"foreignKey:UserID"`

	RoomID *uint
	Room   Room `gorm:"references:id"`

	HotelID *uint
	Hotel   Hotel `gorm:"references:id"`
}
